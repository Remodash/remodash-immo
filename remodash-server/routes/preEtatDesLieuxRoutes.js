const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createPreEDL,
  getPreEDLs,
  getPreEDL,
  updatePreEDL
} = require('../controllers/preEtatDesLieuxController');

router.post('/', auth, role('gardien', 'admin'), createPreEDL);
router.get('/', auth, getPreEDLs);
router.get('/:id', auth, getPreEDL);
router.put('/:id', auth, role('gardien', 'admin'), updatePreEDL);

module.exports = router;