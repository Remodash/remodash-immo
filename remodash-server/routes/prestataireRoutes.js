const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createPrestataire,
  getPrestataires,
  getPrestataire,
  updatePrestataire,
  addPenalite
} = require('../controllers/prestataireController');

router.post('/', auth, role('gestionnaire_technique', 'admin'), createPrestataire);
router.get('/', auth, getPrestataires);
router.get('/:id', auth, getPrestataire);
router.put('/:id', auth, role('gestionnaire_technique', 'admin'), updatePrestataire);

router.post('/:id/penalites', auth, role('gestionnaire_technique', 'admin'), addPenalite);

module.exports = router;