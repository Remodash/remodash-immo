const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createRapport,
  getRapportsForTravaux
} = require('../controllers/rapportJournalierController');

router.post('/', auth, role('gardien', 'prestataire_travaux', 'admin'), createRapport);
router.get('/travaux/:travauxId', auth, getRapportsForTravaux);

module.exports = router;