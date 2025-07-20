const Conge = require('../models/Conge');
const Locataire = require('../models/Locataire');
const Logement = require('../models/Logement');
const { sendNotification } = require('../services/notificationService');

const createConge = async (req, res) => {
  try {
    const { locataireId, dateCongéLocative } = req.body;
    
    const locataire = await Locataire.findById(locataireId).populate('logement');
    if (!locataire) {
      return res.status(404).json({ message: 'Locataire non trouvé' });
    }

    // Vérifier les impayés
    const hasImpayes = locataire.impayes.some(impaye => !impaye.regle);
    const montantImpayes = hasImpayes 
      ? locataire.impayes
          .filter(impaye => !impaye.regle)
          .reduce((sum, impaye) => sum + impaye.montant, 0)
      : 0;

    const conge = new Conge({
      locataire: locataireId,
      logement: locataire.logement._id,
      dateCongéLocative,
      avecImpayes: hasImpayes,
      montantImpayes,
      gestionnaireLocative: req.user.id
    });

    await conge.save();

    // Notifier les services concernés
    if (hasImpayes) {
      await sendNotification({
        type: 'impayes',
        destinataires: ['comptabilite', 'contentieux'],
        contenu: `Nouveau congé avec impayés pour le locataire ${locataire.nom} ${locataire.prenom}`,
        referenceId: conge._id
      });
    }

    await sendNotification({
      type: 'nouveau_conge',
      destinataires: ['gestionnaire_technique', 'gardien'],
      contenu: `Nouveau congé pour le logement ${locataire.logement.adresseComplete}`,
      referenceId: conge._id
    });

    res.status(201).json(conge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getConges = async (req, res) => {
  try {
    const conges = await Conge.find()
      .populate('locataire')
      .populate('logement')
      .populate('gestionnaireLocative gestionnaireTechnique');
    res.json(conges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getConge = async (req, res) => {
  try {
    const conge = await Conge.findById(req.params.id)
      .populate('locataire')
      .populate('logement')
      .populate('gestionnaireLocative gestionnaireTechnique');
    
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }
    res.json(conge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateConge = async (req, res) => {
  try {
    const conge = await Conge.findByIdAndUpdate(req.params.id, req.body, { 
      new: true 
    }).populate('locataire logement');
    
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }
    
    res.json(conge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const schedulePreEDL = async (req, res) => {
  try {
    const { datePreEDL } = req.body;
    const conge = await Conge.findById(req.params.id);
    
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }

    conge.datePreEDL = datePreEDL;
    conge.statut = 'pre_edl';
    await conge.save();

    // Notifier le gardien
    await sendNotification({
      type: 'pre_edl_programme',
      destinataires: ['gardien'],
      contenu: `Pré-EDL programmé pour le ${datePreEDL.toLocaleDateString()}`,
      referenceId: conge._id
    });

    res.json(conge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const completeConge = async (req, res) => {
  try {
    const conge = await Conge.findById(req.params.id);
    
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }

    conge.statut = 'terminé';
    conge.dateEDLSortie = Date.now();
    await conge.save();

    // Mettre à jour le statut du logement
    await Logement.findByIdAndUpdate(conge.logement, { statutOccupation: 'vacant' });

    // Notifier le service d'attribution
    await sendNotification({
      type: 'logement_vacant',
      destinataires: ['attribution'],
      contenu: `Le logement est maintenant vacant et prêt pour une nouvelle attribution`,
      referenceId: conge.logement
    });

    res.json(conge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createConge,
  getConges,
  getConge,
  updateConge,
  schedulePreEDL,
  completeConge
};