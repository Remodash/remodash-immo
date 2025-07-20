const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createTravaux,
  getTravaux,
  addRapportJournalier,
  completeTravaux
} = require('../controllers/travauxController');

router.post('/', auth, role('gestionnaire_technique', 'admin'), createTravaux);
router.get('/:id', auth, getTravaux);

router.post('/:id/rapports', auth, role('gardien', 'prestataire_travaux', 'admin'), addRapportJournalier);
router.post('/:id/complete', auth, role('gardien', 'prestataire_travaux', 'admin'), completeTravaux);

module.exports = router;