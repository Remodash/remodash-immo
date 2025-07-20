const mongoose = require('mongoose');

const logementSchema = new mongoose.Schema({
  numeroUnique: { type: String, required: true, unique: true },
  adresseComplete: { type: String, required: true },
  batiment: { type: String },
  etage: { type: String },
  cage: { type: String },
  numeroPorte: { type: String, required: true },
  typologie: { type: String, enum: ['Studio', 'T1', 'T2', 'T3', 'T4', 'T5+'] },
  nombrePieces: { type: Number },
  surfaceHabitable: { type: Number, required: true },
  surfaceAnnexe: { type: Number },
  anneeConstruction: { type: Number },
  typeStructure: { type: String },
  chauffage: { type: String },
  energie: { type: String },
  etatLogement: { type: String },
  quartier: { type: String },
  statutOccupation: { type: String, enum: ['occupé', 'vacant'], default: 'occupé' },
  dureeVacance: { type: Number, default: 0 },
  classDPE: { type: String, enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  diagnostics: [{
    type: { type: String },
    date: { type: Date },
    valide: { type: Boolean }
  }],
  travauxRecents: [{
    description: { type: String },
    date: { type: Date },
    cout: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Logement', logementSchema);