const mongoose = require('mongoose');

const bonDiagnosticSchema = new mongoose.Schema({
  conge: { type: mongoose.Schema.Types.ObjectId, ref: 'Conge', required: true },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true },
  dateCreation: { type: Date, default: Date.now },
  diagnostics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostic' }],
  statut: { type: String, enum: ['en_attente', 'validé', 'transmis'], default: 'en_attente' },
  validateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  dateValidation: { type: Date },
  signatureNumerique: { type: String },
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire' }
}, { timestamps: true });

module.exports = mongoose.model('BonDiagnostic', bonDiagnosticSchema);