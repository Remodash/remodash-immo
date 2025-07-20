const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createBonDiagnostic,
  validateBonDiagnostic,
  signBonDiagnostic,
  getBonDiagnostics,
  getBonDiagnostic
} = require('../controllers/bonDiagnosticController');

router.post('/', auth, role('gestionnaire_technique', 'admin'), createBonDiagnostic);
router.post('/:id/validate', auth, role('gestionnaire_technique', 'admin'), validateBonDiagnostic);
router.post('/:id/sign', auth, role('responsable_agence', 'admin'), signBonDiagnostic);
router.get('/', auth, getBonDiagnostics);
router.get('/:id', auth, getBonDiagnostic);

module.exports = router;