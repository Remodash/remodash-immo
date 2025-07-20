const mongoose = require('mongoose');

const posteTravauxSchema = new mongoose.Schema({
  nature: { type: String, required: true },
  description: { type: String, required: true },
  prixUnitaire: { type: Number, required: true },
  quantite: { type: Number, default: 1 },
  montantTotal: { type: Number },
  refacturable: { type: Boolean, default: false },
  tauxVetuste: { type: Number, default: 0 },
  justification: { type: String }
});

const bonTravauxSchema = new mongoose.Schema({
  conge: { type: mongoose.Schema.Types.ObjectId, ref: 'Conge', required: true },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true },
  dateCreation: { type: Date, default: Date.now },
  natureTravaux: { type: String, required: true },
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire', required: true },
  postes: [posteTravauxSchema],
  coutEstime: { type: Number, required: true },
  partageFinancier: { type: String },
  delaiIntervention: { type: Number, required: true }, // en jours
  niveauFinition: { type: String },
  statut: { type: String, enum: ['en_attente', 'validé', 'transmis', 'en_cours', 'terminé'], default: 'en_attente' },
  dateValidation: { type: Date },
  signatureNumerique: { type: String },
  validateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  gestionnaireTechnique: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }
}, { timestamps: true });

bonTravauxSchema.pre('save', function(next) {
  this.postes.forEach(poste => {
    poste.montantTotal = poste.prixUnitaire * poste.quantite;
  });
  next();
});

module.exports = mongoose.model('BonTravaux', bonTravauxSchema);