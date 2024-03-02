const router = require('express').Router();
const ticketController = require('../../controller/ticketController');

router.route('/')
    .get(ticketController.getAllTickets)
    .post(ticketController.bookTicket)
    .delete(ticketController.deleteTicket);
router.route('/:username').get(ticketController.getSingleUserTicket);

module.exports = router;