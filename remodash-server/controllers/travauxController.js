const Travaux = require('../models/Travaux');
const BonTravaux = require('../models/BonTravaux');
const { sendNotification } = require('../services/notificationService');

const createTravaux = async (req, res) => {
  try {
    const { bonTravauxId, dateDebut } = req.body;
    
    const bonTravaux = await BonTravaux.findById(bonTravauxId)
      .populate('logement conge prestataire');
    
    if (!bonTravaux) {
      return res.status(404).json({ message: 'Bon de travaux non trouvé' });
    }

    const travaux = new Travaux({
      bonTravaux: bonTravauxId,
      dateDebut,
      prestataire: bonTravaux.prestataire._id,
      logement: bonTravaux.logement._id,
      conge: bonTravaux.conge._id,
      statut: 'en_cours'
    });

    await travaux.save();

    // Mettre à jour le statut du bon de travaux
    bonTravaux.statut = 'en_cours';
    await bonTravaux.save();

    // Notifier le gardien pour suivi
    await sendNotification({
      type: 'travaux_demarres',
      destinataires: ['gardien'],
      contenu: `Travaux démarrés pour le logement ${bonTravaux.logement.adresseComplete}`,
      referenceId: travaux._id
    });

    res.status(201).json(travaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTravaux = async (req, res) => {
  try {
    const travaux = await Travaux.findById(req.params.id)
      .populate('bonTravaux')
      .populate('logement')
      .populate('conge')
      .populate('prestataire');
    
    if (!travaux) {
      return res.status(404).json({ message: 'Travaux non trouvés' });
    }
    res.json(travaux);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRapportJournalier = async (req, res) => {
  try {
    const { avancement, problemes, qualite, photos } = req.body;
    
    const travaux = await Travaux.findById(req.params.id);
    if (!travaux) {
      return res.status(404).json({ message: 'Travaux non trouvés' });
    }

    const rapport = {
      avancement,
      problemes,
      qualite,
      photos,
      auteur: req.user.id
    };

    travaux.rapports.push(rapport);
    
    // Calculer l'avancement global
    if (avancement === '100%') {
      travaux.statut = 'terminé';
      travaux.dateFin = Date.now();
    }
    
    await travaux.save();

    // Notifier le GT si problèmes signalés
    if (problemes) {
      await sendNotification({
        type: 'probleme_travaux',
        destinataires: ['gestionnaire_technique'],
        contenu: `Problème signalé lors des travaux: ${problemes}`,
        referenceId: travaux._id
      });
    }

    res.status(201).json(travaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const completeTravaux = async (req, res) => {
  try {
    const travaux = await Travaux.findById(req.params.id)
      .populate('bonTravaux logement conge');
    
    if (!travaux) {
      return res.status(404).json({ message: 'Travaux non trouvés' });
    }

    travaux.statut = 'terminé';
    travaux.dateFin = Date.now();
    travaux.respectDelais = !req.body.retard;
    
    if (req.body.retard) {
      // Calculer les pénalités (simplifié)
      const joursRetard = req.body.joursRetard || 1;
      travaux.penalites = travaux.bonTravaux.coutEstime * 0.01 * joursRetard;
    }
    
    await travaux.save();

    // Notifier pour réception des travaux
    await sendNotification({
      type: 'travaux_termines',
      destinataires: ['gestionnaire_technique', 'gardien'],
      contenu: `Travaux terminés pour le logement ${travaux.logement.adresseComplete}`,
      referenceId: travaux._id
    });

    res.json(travaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createTravaux,
  getTravaux,
  addRapportJournalier,
  completeTravaux
};