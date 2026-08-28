const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profile.controller');

router.get('/', ctrl.getProfile);
router.put('/', ctrl.updateProfile); // TODO: protect this route with auth middleware

module.exports = router;
