const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: [
      'nouveau_conge', 
      'impayes',
      'pre_edl_programme',
      'diagnostics_a_realiser',
      'travaux_a_realiser',
      'probleme_travaux',
      'logement_vacant',
      'penalite_appliquee'
    ]
  },
  destinataires: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur',
    required: true 
  }],
  contenu: { type: String, required: true },
  referenceId: mongoose.Schema.Types.ObjectId,
  dateEnvoi: { type: Date, default: Date.now },
  lue: { type: Boolean, default: false },
  lueLe: Date
}, { timestamps: true });

notificationSchema.index({ destinataires: 1, lue: 1 });

module.exports = mongoose.model('SystemeNotification', notificationSchema);