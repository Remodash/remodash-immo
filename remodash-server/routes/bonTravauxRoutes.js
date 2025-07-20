const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createBonTravaux,
  validateBonTravaux,
  signBonTravaux,
  createDirectBonTravaux,
  getBonTravaux,
  getBonTravauxList
} = require('../controllers/bonTravauxController');

router.post('/', auth, role('gestionnaire_technique', 'admin'), createBonTravaux);
router.post('/direct', auth, role('gestionnaire_technique', 'admin'), createDirectBonTravaux);
router.post('/:id/validate', auth, role('gestionnaire_technique', 'admin'), validateBonTravaux);
router.post('/:id/sign', auth, role('responsable_agence', 'admin'), signBonTravaux);
router.get('/', auth, getBonTravauxList);
router.get('/:id', auth, getBonTravaux);

module.exports = router;