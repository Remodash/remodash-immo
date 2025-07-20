const Logement = require('../models/Logement');

const createLogement = async (req, res) => {
  try {
    const logement = new Logement(req.body);
    await logement.save();
    res.status(201).json(logement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLogements = async (req, res) => {
  try {
    const { statut } = req.query;
    const query = statut ? { statutOccupation: statut } : {};
    const logements = await Logement.find(query);
    res.json(logements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLogement = async (req, res) => {
  try {
    const logement = await Logement.findById(req.params.id);
    if (!logement) {
      return res.status(404).json({ message: 'Logement non trouvé' });
    }
    res.json(logement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLogement = async (req, res) => {
  try {
    const logement = await Logement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!logement) {
      return res.status(404).json({ message: 'Logement non trouvé' });
    }
    res.json(logement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addDiagnostic = async (req, res) => {
  try {
    const { type, date, valide } = req.body;
    const logement = await Logement.findById(req.params.id);
    if (!logement) {
      return res.status(404).json({ message: 'Logement non trouvé' });
    }
    logement.diagnostics.push({ type, date, valide });
    await logement.save();
    res.json(logement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createLogement,
  getLogements,
  getLogement,
  updateLogement,
  addDiagnostic
};