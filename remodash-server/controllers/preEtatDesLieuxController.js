const PreEtatDesLieux = require('../models/PreEtatDesLieux');
const Conge = require('../models/Conge');
const { determineDiagnostics } = require('../services/iaService');

const createPreEDL = async (req, res) => {
  try {
    const { congeId, observations, etatEquipements, relevesCompteurs, photos } = req.body;
    
    const conge = await Conge.findById(congeId).populate('logement');
    if (!conge) {
      return res.status(404).json({ message: 'Congé non trouvé' });
    }

    const preEDL = new PreEtatDesLieux({
      conge: congeId,
      dateRealisation: Date.now(),
      observations,
      etatEquipements,
      relevesCompteurs,
      photos,
      auteur: req.user.id
    });

    await preEDL.save();

    // Mettre à jour le statut du congé
    conge.statut = 'diagnostics';
    await conge.save();

    // Déterminer les diagnostics nécessaires via IA
    const diagnostics = await determineDiagnostics(preEDL, conge.logement);

    res.status(201).json({
      preEDL,
      diagnosticsRecommandes: diagnostics
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPreEDLs = async (req, res) => {
  try {
    const preEDLs = await PreEtatDesLieux.find()
      .populate('conge')
      .populate('auteur');
    res.json(preEDLs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPreEDL = async (req, res) => {
  try {
    const preEDL = await PreEtatDesLieux.findById(req.params.id)
      .populate('conge')
      .populate('auteur');
    
    if (!preEDL) {
      return res.status(404).json({ message: 'Pré-EDL non trouvé' });
    }
    res.json(preEDL);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePreEDL = async (req, res) => {
  try {
    const preEDL = await PreEtatDesLieux.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('conge');
    
    if (!preEDL) {
      return res.status(404).json({ message: 'Pré-EDL non trouvé' });
    }
    
    res.json(preEDL);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createPreEDL,
  getPreEDLs,
  getPreEDL,
  updatePreEDL
};