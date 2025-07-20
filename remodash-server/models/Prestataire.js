const mongoose = require('mongoose');

const prestataireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  specialite: { type: String, required: true },
  coordonnees: {
    adresse: { type: String },
    telephone: { type: String, required: true },
    email: { type: String, required: true }
  },
  competences: [{ type: String }],
  notePerformance: { type: Number, default: 0 },
  contrats: [{
    reference: { type: String },
    dateDebut: { type: Date },
    dateFin: { type: Date },
    conditions: { type: String }
  }],
  penalites: [{
    montant: { type: Number },
    date: { type: Date },
    motif: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Prestataire', prestataireSchema);