const Utilisateur = require('../models/Utilisateur');

const getUtilisateurs = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};
    
    const utilisateurs = await Utilisateur.find(query).select('-password');
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id).select('-password');
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).select('-password');
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  updatePermissions
};