const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createLocataire,
  getLocataires,
  getLocataire,
  updateLocataire,
  deleteLocataire,
  addImpaye,
  resolveImpaye
} = require('../controllers/locataireController');

router.post('/', auth, role('gestionnaire_locative', 'admin'), createLocataire);
router.get('/', auth, getLocataires);
router.get('/:id', auth, getLocataire);
router.put('/:id', auth, role('gestionnaire_locative', 'admin'), updateLocataire);
router.delete('/:id', auth, role('gestionnaire_locative', 'admin'), deleteLocataire);

router.post('/:id/impayes', auth, role('comptabilite', 'admin'), addImpaye);
router.put('/:id/impayes/:impayeId/resolve', auth, role('comptabilite', 'admin'), resolveImpaye);

module.exports = router;