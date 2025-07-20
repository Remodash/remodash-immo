const BonTravaux = require('../models/BonTravaux');
const Conge = require('../models/Conge');
const Logement = require('../models/Logement');
const { generateBonTravaux } = require('../services/iaService');
const { sendNotification } = require('../services/notificationService');

const createBonTravaux = async (req, res) => {
  try {
    const { congeId, prestataireId, delaiIntervention, niveauFinition } = req.body;
    
    const conge = await Conge.findById(congeId).populate('logement');
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }

    // Générer le bon de travaux via IA
    const bonTravauxData = await generateBonTravaux(conge.logement, congeId);

    const bonTravaux = new BonTravaux({
      conge: congeId,
      logement: conge.logement._id,
      prestataire: prestataireId,
      delaiIntervention,
      niveauFinition,
      gestionnaireTechnique: req.user.id,
      ...bonTravauxData
    });

    await bonTravaux.save();

    res.status(201).json(bonTravaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const validateBonTravaux = async (req, res) => {
  try {
    const bonTravaux = await BonTravaux.findById(req.params.id)
      .populate('conge')
      .populate('logement')
      .populate('prestataire');
    
    if (!bonTravaux) {
      return res.status(404).json({ message: 'Bon de travaux non trouvé' });
    }

    bonTravaux.statut = 'validé';
    bonTravaux.validateur = req.user.id;
    bonTravaux.dateValidation = Date.now();
    await bonTravaux.save();

    // Notifier le responsable d'agence pour signature
    await sendNotification({
      type: 'bon_travaux_a_signer',
      destinataires: ['responsable_agence'],
      contenu: `Bon de travaux prêt pour signature pour le logement ${bonTravaux.logement.adresseComplete}`,
      referenceId: bonTravaux._id
    });

    res.json(bonTravaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signBonTravaux = async (req, res) => {
  try {
    const bonTravaux = await BonTravaux.findById(req.params.id)
      .populate('conge')
      .populate('logement')
      .populate('prestataire');
    
    if (!bonTravaux) {
      return res.status(404).json({ message: 'Bon de travaux non trouvé' });
    }

    bonTravaux.statut = 'transmis';
    bonTravaux.signatureNumerique = `signé_numériquement_par_${req.user.id}_${Date.now()}`;
    await bonTravaux.save();

    // Notifier le prestataire et le gardien
    await sendNotification({
      type: 'travaux_a_realiser',
      destinataires: ['prestataire_travaux', 'gardien'],
      contenu: `Nouveaux travaux à réaliser pour le logement ${bonTravaux.logement.adresseComplete}`,
      referenceId: bonTravaux._id
    });

    res.json(bonTravaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createDirectBonTravaux = async (req, res) => {
  try {
    const { congeId, prestataireId, natureTravaux, postes, delaiIntervention, justification } = req.body;
    
    const conge = await Conge.findById(congeId).populate('logement');
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }

    const coutEstime = postes.reduce((sum, poste) => sum + (poste.prixUnitaire * poste.quantite), 0);

    const bonTravaux = new BonTravaux({
      conge: congeId,
      logement: conge.logement._id,
      prestataire: prestataireId,
      natureTravaux,
      postes,
      coutEstime,
      delaiIntervention,
      justification,
      gestionnaireTechnique: req.user.id,
      statut: 'en_attente'
    });

    await bonTravaux.save();

    res.status(201).json(bonTravaux);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBonTravaux = async (req, res) => {
  try {
    const bonTravaux = await BonTravaux.findById(req.params.id)
      .populate('conge')
      .populate('logement')
      .populate('prestataire gestionnaireTechnique validateur');
    
    if (!bonTravaux) {
      return res.status(404).json({ message: 'Bon de travaux non trouvé' });
    }
    res.json(bonTravaux);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBonTravauxList = async (req, res) => {
  try {
    const bonTravauxList = await BonTravaux.find()
      .populate('conge')
      .populate('logement')
      .populate('prestataire gestionnaireTechnique validateur');
    res.json(bonTravauxList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBonTravaux,
  validateBonTravaux,
  signBonTravaux,
  createDirectBonTravaux,
  getBonTravaux,
  getBonTravauxList
};