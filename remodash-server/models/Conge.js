const mongoose = require('mongoose');

const congeSchema = new mongoose.Schema({
  locataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Locataire', required: true },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true },
  datePreEDL: { type: Date },
  dateCongéLocative: { type: Date, required: true },
  dateEDLSortie: { type: Date },
  statut: { 
    type: String, 
    enum: ['notifié', 'pre_edl', 'diagnostics', 'travaux', 'nettoyage', 'terminé'], 
    default: 'notifié' 
  },
  avecImpayes: { type: Boolean, default: false },
  montantImpayes: { type: Number, default: 0 },
  notifications: [{
    type: { type: String },
    date: { type: Date },
    destinataires: [{ type: String }]
  }],
  gestionnaireLocative: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  gestionnaireTechnique: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }
}, { timestamps: true });

module.exports = mongoose.model('Conge', congeSchema);