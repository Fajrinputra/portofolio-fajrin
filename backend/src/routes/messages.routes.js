const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/messages.controller');

router.get('/', ctrl.getAll);                   // admin only
router.get('/unread-count', ctrl.unreadCount);   // admin only
router.post('/', ctrl.create);                   // public - kirim pesan
router.patch('/:id/read', ctrl.markRead);        // admin only
router.delete('/:id', ctrl.remove);              // admin only

module.exports = router;
