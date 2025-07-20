const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createLogement,
  getLogements,
  getLogement,
  updateLogement,
  addDiagnostic
} = require('../controllers/logementController');

router.post('/', auth, role('gestionnaire_technique', 'admin'), createLogement);
router.get('/', auth, getLogements);
router.get('/:id', auth, getLogement);
router.put('/:id', auth, role('gestionnaire_technique', 'admin'), updateLogement);
router.post('/:id/diagnostics', auth, role('gestionnaire_technique', 'admin'), addDiagnostic);

// Important: bien exporter le router
module.exports = router;