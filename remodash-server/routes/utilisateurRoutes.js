const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  updatePermissions
} = require('../controllers/utilisateurController');

router.get('/', auth, role('admin'), getUtilisateurs);
router.get('/:id', auth, role('admin'), getUtilisateur);
router.put('/:id', auth, role('admin'), updateUtilisateur);
router.put('/:id/permissions', auth, role('admin'), updatePermissions);

module.exports = router;