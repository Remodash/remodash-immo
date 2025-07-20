const RapportJournalier = require('../models/RapportJournalier');
const Travaux = require('../models/Travaux');
const { sendNotification } = require('../services/notificationService');

const createRapport = async (req, res) => {
  try {
    const { travauxId, avancement, problemes, qualite, photos } = req.body;
    
    const travaux = await Travaux.findById(travauxId);
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
    
    // Mettre à jour l'avancement global
    travaux.avancement = avancement.includes('%') 
      ? parseInt(avancement) 
      : 100; // Si "terminé" ou similaire
    
    if (travaux.avancement >= 100) {
      travaux.statut = 'terminé';
      travaux.dateFin = Date.now();
    }
    
    await travaux.save();

    // Notifier si problèmes
    if (problemes) {
      await sendNotification({
        type: 'probleme_travaux',
        destinataires: ['gestionnaire_technique'],
        contenu: `Problème signalé dans le rapport journalier: ${problemes}`,
        referenceId: travaux._id
      });
    }

    res.status(201).json(travaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRapportsForTravaux = async (req, res) => {
  try {
    const travaux = await Travaux.findById(req.params.travauxId)
      .select('rapports')
      .populate('rapports.auteur');
    
    if (!travaux) {
      return res.status(404).json({ message: 'Travaux non trouvés' });
    }
    res.json(travaux.rapports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRapport,
  getRapportsForTravaux
};