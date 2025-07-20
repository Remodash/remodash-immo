const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['gestionnaire_locative', 'gestionnaire_technique', 'responsable_agence', 'gardien', 'comptabilite', 'contentieux', 'attribution', 'admin']
  },
  permissions: [{ type: String }],
  derniereConnexion: { type: Date },
}, { timestamps: true });

utilisateurSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

utilisateurSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Utilisateur', utilisateurSchema);