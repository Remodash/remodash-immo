const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  getDiagnostics,
  getDiagnostic,
  updateDiagnostic,
  completeDiagnostic,
  validateDiagnostic
} = require('../controllers/diagnosticController');

router.get('/', auth, getDiagnostics);
router.get('/:id', auth, getDiagnostic);
router.put('/:id', auth, role('prestataire_diagnostics', 'admin'), updateDiagnostic);

router.post('/:id/complete', auth, role('prestataire_diagnostics', 'admin'), completeDiagnostic);
router.post('/:id/validate', auth, role('gestionnaire_technique', 'admin'), validateDiagnostic);

module.exports = router;