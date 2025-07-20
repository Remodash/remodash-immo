const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createConge,
  getConges,
  getConge,
  updateConge,
  schedulePreEDL,
  completeConge
} = require('../controllers/congeController');

router.post('/', auth, role('gestionnaire_locative', 'admin'), createConge);
router.get('/', auth, getConges);
router.get('/:id', auth, getConge);
router.put('/:id', auth, role('gestionnaire_locative', 'admin'), updateConge);

router.post('/:id/schedule-pre-edl', auth, role('gestionnaire_locative', 'admin'), schedulePreEDL);
router.post('/:id/complete', auth, role('gestionnaire_locative', 'admin'), completeConge);

module.exports = router;