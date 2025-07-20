const Locataire = require('../models/Locataire');
const Logement = require('../models/Logement');

const createLocataire = async (req, res) => {
  try {
    const locataire = new Locataire(req.body);
    await locataire.save();

    // Mettre à jour le statut du logement
    await Logement.findByIdAndUpdate(locataire.logement, { statutOccupation: 'occupé' });

    res.status(201).json(locataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLocataires = async (req, res) => {
  try {
    const locataires = await Locataire.find().populate('logement');
    res.json(locataires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLocataire = async (req, res) => {
  try {
    const locataire = await Locataire.findById(req.params.id).populate('logement');
    if (!locataire) {
      return res.status(404).json({ message: 'Locataire non trouvé' });
    }
    res.json(locataire);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLocataire = async (req, res) => {
  try {
    const locataire = await Locataire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!locataire) {
      return res.status(404).json({ message: 'Locataire non trouvé' });
    }
    res.json(locataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteLocataire = async (req, res) => {
  try {
    const locataire = await Locataire.findByIdAndDelete(req.params.id);
    if (!locataire) {
      return res.status(404).json({ message: 'Locataire non trouvé' });
    }

    // Mettre à jour le statut du logement
    await Logement.findByIdAndUpdate(locataire.logement, { statutOccupation: 'vacant' });

    res.json({ message: 'Locataire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addImpaye = async (req, res) => {
  try {
    const { montant, date } = req.body;
    const locataire = await Locataire.findById(req.params.id);
    
    if (!locataire) {
      return res.status(404).json({ message: 'Locataire non trouvé' });
    }

    locataire.impayes.push({ montant, date });
    await locataire.save();

    res.status(201).json(locataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resolveImpaye = async (req, res) => {
  try {
    const locataire = await Locataire.findById(req.params.id);
    
    if (!locataire) {
      return res.status(404).json({ message: 'Locataire non trouvé' });
    }

    const impaye = locataire.impayes.id(req.params.impayeId);
    if (!impaye) {
      return res.status(404).json({ message: 'Impayé non trouvé' });
    }

    impaye.regle = true;
    await locataire.save();

    res.json(locataire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createLocataire,
  getLocataires,
  getLocataire,
  updateLocataire,
  deleteLocataire,
  addImpaye,
  resolveImpaye
};