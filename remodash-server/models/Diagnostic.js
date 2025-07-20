const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  type: { type: String, required: true },
  criteresDeclenchement: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now },
  statut: { type: String, enum: ['à_realiser', 'en_cours', 'terminé', 'validé'], default: 'à_realiser' },
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire' },
  dateRestitution: { type: Date },
  resultat: { type: String },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true },
  conge: { type: mongoose.Schema.Types.ObjectId, ref: 'Conge', required: true },
  documents: [{ type: String }],
  validateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  dateValidation: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Diagnostic', diagnosticSchema);