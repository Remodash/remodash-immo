const mongoose = require('mongoose');

const rapportJournalierSchema = new mongoose.Schema({
  dateRapport: { type: Date, default: Date.now },
  avancement: { type: String, required: true },
  problemes: { type: String },
  qualite: { type: String },
  photos: [{ type: String }],
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }
});

const travauxSchema = new mongoose.Schema({
  bonTravaux: { type: mongoose.Schema.Types.ObjectId, ref: 'BonTravaux', required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date },
  statut: { type: String, enum: ['planifié', 'en_cours', 'suspendu', 'terminé'], default: 'planifié' },
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire', required: true },
  avancement: { type: Number, default: 0 },
  qualite: { type: String },
  rapports: [rapportJournalierSchema],
  respectDelais: { type: Boolean },
  penalites: { type: Number, default: 0 },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true },
  conge: { type: mongoose.Schema.Types.ObjectId, ref: 'Conge', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Travaux', travauxSchema);