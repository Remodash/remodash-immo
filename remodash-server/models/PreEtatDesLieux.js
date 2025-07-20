const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  dateHorodatage: { type: Date, default: Date.now },
  description: { type: String },
  piece: { type: String, required: true }
});

const preEtatDesLieuxSchema = new mongoose.Schema({
  conge: { type: mongoose.Schema.Types.ObjectId, ref: 'Conge', required: true },
  dateRealisation: { type: Date, required: true },
  observations: { type: String },
  etatEquipements: { type: String },
  relevesCompteurs: { type: String },
  photos: [photoSchema],
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  statut: { type: String, enum: ['en_cours', 'complet', 'validé'], default: 'en_cours' }
}, { timestamps: true });

module.exports = mongoose.model('PreEtatDesLieux', preEtatDesLieuxSchema);