const Prestataire = require('../models/Prestataire');
const { sendNotification } = require('../services/notificationService');

const createPrestataire = async (req, res) => {
  try {
    const prestataire = new Prestataire(req.body);
    await prestataire.save();
    
    res.status(201).json(prestataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPrestataires = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    
    const prestataires = await Prestataire.find(query);
    res.json(prestataires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPrestataire = async (req, res) => {
  try {
    const prestataire = await Prestataire.findById(req.params.id);
    
    if (!prestataire) {
      return res.status(404).json({ message: 'Prestataire non trouvé' });
    }
    res.json(prestataire);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePrestataire = async (req, res) => {
  try {
    const prestataire = await Prestataire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!prestataire) {
      return res.status(404).json({ message: 'Prestataire non trouvé' });
    }
    res.json(prestataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addPenalite = async (req, res) => {
  try {
    const { montant, motif } = req.body;
    const prestataire = await Prestataire.findById(req.params.id);
    
    if (!prestataire) {
      return res.status(404).json({ message: 'Prestataire non trouvé' });
    }

    prestataire.penalites.push({ montant, motif, date: Date.now() });
    await prestataire.save();

    // Notifier le prestataire
    await sendNotification({
      type: 'penalite_appliquee',
      destinataires: [prestataire._id],
      contenu: `Pénalité appliquée: ${motif} - Montant: ${montant}€`,
      referenceId: null
    });

    res.json(prestataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createPrestataire,
  getPrestataires,
  getPrestataire,
  updatePrestataire,
  addPenalite
};