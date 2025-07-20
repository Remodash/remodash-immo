const mongoose = require('mongoose');

const grilleVetusteSchema = new mongoose.Schema({
  poste: { type: String, required: true, unique: true },
  dureeVie: { type: Number, required: true }, // en années
  tauxAnnuel: { type: Number, required: true }, // en pourcentage
  conditions: { type: String },
  franchise: { type: Number, default: 0 }, // en années
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('GrilleVetuste', grilleVetusteSchema);