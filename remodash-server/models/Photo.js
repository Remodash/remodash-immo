const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  dateHorodatage: { type: Date, default: Date.now },
  geolocalisation: {
    lat: Number,
    lng: Number
  },
  description: String,
  piece: { type: String, required: true },
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  logement: { type: mongoose.Schema.Types.ObjectId, ref: 'Logement', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);