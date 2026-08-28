const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/certificates.controller');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);         // TODO: protect this route with auth middleware
router.put('/:id', ctrl.update);       // TODO: protect this route with auth middleware
router.delete('/:id', ctrl.remove);    // TODO: protect this route with auth middleware

module.exports = router;
