const Diagnostic = require('../models/Diagnostic');
const BonDiagnostic = require('../models/BonDiagnostic');
const { sendNotification } = require('../services/notificationService');

const getDiagnostics = async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find()
      .populate('logement')
      .populate('conge')
      .populate('prestataire validateur');
    res.json(diagnostics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findById(req.params.id)
      .populate('logement')
      .populate('conge')
      .populate('prestataire validateur');
    
    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic non trouvé' });
    }
    res.json(diagnostic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('logement conge');
    
    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic non trouvé' });
    }
    
    res.json(diagnostic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const completeDiagnostic = async (req, res) => {
  try {
    const { resultat, documents } = req.body;
    const diagnostic = await Diagnostic.findById(req.params.id)
      .populate('logement conge');
    
    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic non trouvé' });
    }

    diagnostic.statut = 'terminé';
    diagnostic.resultat = resultat;
    diagnostic.documents = documents;
    diagnostic.dateRestitution = Date.now();
    
    await diagnostic.save();

    // Notifier le GT pour validation
    await sendNotification({
      type: 'diagnostic_termine',
      destinataires: ['gestionnaire_technique'],
      contenu: `Diagnostic ${diagnostic.type} terminé pour le logement ${diagnostic.logement.adresseComplete}`,
      referenceId: diagnostic._id
    });

    res.json(diagnostic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const validateDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findById(req.params.id)
      .populate('logement conge');
    
    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic non trouvé' });
    }

    diagnostic.statut = 'validé';
    diagnostic.validateur = req.user.id;
    diagnostic.dateValidation = Date.now();
    
    await diagnostic.save();

    res.json(diagnostic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getDiagnostics,
  getDiagnostic,
  updateDiagnostic,
  completeDiagnostic,
  validateDiagnostic
};