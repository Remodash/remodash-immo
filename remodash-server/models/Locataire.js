const mongoose = require('mongoose');

const locataireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: { type: Date },
  lieuNaissance: { type: String },
  nationalite: { type: String },
  numeroSecuriteSociale: { type: String },
  pieceIdentite: { type: String },
  situationFamiliale: { type: String },
  telephone: { type: String, required: true },
  email: { type: String },
  personneUrgence: { type: String },
  profession: { type: String },
  statutProfessionnel: { type: String },
  revenus: { type: Number },
  rib: { type: String },
  dateEntree: { type: Date, required: true },
  typeBail: { type: String },
  loyer: { type: Number, required: true },
  charges: { type: Number },
  consentementRGPD: { type: Boolean, default: false },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true },
  impayes: [{
    montant: { type: Number },
    date: { type: Date },
    regle: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Locataire', locataireSchema);