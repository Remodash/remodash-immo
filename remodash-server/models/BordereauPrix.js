const mongoose = require('mongoose');

const bordereauPrixSchema = new mongoose.Schema({
  codePoste: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  prixUnitaire: { type: Number, required: true },
  unite: { type: String, required: true },
  dateValidite: { type: Date, required: true },
  conditionsGarantie: { type: String },
  tempsEstime: { type: Number }, // en heures
  materielsStandards: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('BordereauPrix', bordereauPrixSchema);