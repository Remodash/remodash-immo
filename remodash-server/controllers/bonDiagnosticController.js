const BonDiagnostic = require('../models/BonDiagnostic');
const Diagnostic = require('../models/Diagnostic');
const Conge = require('../models/Conge');
const { sendNotification } = require('../services/notificationService');

const createBonDiagnostic = async (req, res) => {
  try {
    const { congeId, diagnostics } = req.body;
    
    const conge = await Conge.findById(congeId).populate('logement');
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }

    // Créer les diagnostics
    const createdDiagnostics = await Diagnostic.insertMany(diagnostics.map(d => ({
      ...d,
      logement: conge.logement._id,
      conge: congeId
    })));

    const bonDiagnostic = new BonDiagnostic({
      conge: congeId,
      logement: conge.logement._id,
      diagnostics: createdDiagnostics.map(d => d._id),
      gestionnaireTechnique: req.user.id
    });

    await bonDiagnostic.save();

    res.status(201).json(bonDiagnostic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const validateBonDiagnostic = async (req, res) => {
  try {
    const bonDiagnostic = await BonDiagnostic.findById(req.params.id)
      .populate('diagnostics')
      .populate('conge');
    
    if (!bonDiagnostic) {
      return res.status(404).json({ message: 'Bon de diagnostic non trouvé' });
    }

    bonDiagnostic.statut = 'validé';
    bonDiagnostic.validateur = req.user.id;
    bonDiagnostic.dateValidation = Date.now();
    await bonDiagnostic.save();

    // Mettre à jour le statut des diagnostics
    await Diagnostic.updateMany(
      { _id: { $in: bonDiagnostic.diagnostics } },
      { statut: 'à_realiser' }
    );

    // Notifier le responsable d'agence pour signature
    await sendNotification({
      type: 'bon_diagnostic_a_signer',
      destinataires: ['responsable_agence'],
      contenu: `Bon de diagnostic prêt pour signature pour le logement ${bonDiagnostic.conge.logement.adresseComplete}`,
      referenceId: bonDiagnostic._id
    });

    res.json(bonDiagnostic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signBonDiagnostic = async (req, res) => {
  try {
    const bonDiagnostic = await BonDiagnostic.findById(req.params.id)
      .populate('conge');
    
    if (!bonDiagnostic) {
      return res.status(404).json({ message: 'Bon de diagnostic non trouvé' });
    }

    bonDiagnostic.statut = 'transmis';
    bonDiagnostic.signatureNumerique = `signé_numériquement_par_${req.user.id}_${Date.now()}`;
    await bonDiagnostic.save();

    // Notifier le prestataire de diagnostic
    // (implémentation dépendante du système de notification)
    await sendNotification({
      type: 'diagnostics_a_realiser',
      destinataires: ['prestataire_diagnostics'],
      contenu: `Nouveaux diagnostics à réaliser pour le logement ${bonDiagnostic.conge.logement.adresseComplete}`,
      referenceId: bonDiagnostic._id
    });

    res.json(bonDiagnostic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBonDiagnostics = async (req, res) => {
  try {
    const bonDiagnostics = await BonDiagnostic.find()
      .populate('conge')
      .populate('logement')
      .populate('diagnostics')
      .populate('gestionnaireTechnique validateur');
    res.json(bonDiagnostics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBonDiagnostic = async (req, res) => {
  try {
    const bonDiagnostic = await BonDiagnostic.findById(req.params.id)
      .populate('conge')
      .populate('logement')
      .populate('diagnostics')
      .populate('gestionnaireTechnique validateur');
    
    if (!bonDiagnostic) {
      return res.status(404).json({ message: 'Bon de diagnostic non trouvé' });
    }
    res.json(bonDiagnostic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBonDiagnostic,
  validateBonDiagnostic,
  signBonDiagnostic,
  getBonDiagnostics,
  getBonDiagnostic
};