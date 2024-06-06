const express = require('express')

const router = express.Router();
const appointmentController = require('../controller/appointment.controller');

router.get('/', appointmentController.findAll);

router.post('/', appointmentController.create);

router.get('/:id', appointmentController.findById);

//router.put('/:id', appointmentController.update);
router.post('/put/:id', appointmentController.update);

//router.delete('/:id', appointmentController.delete);
router.get('/delete/:id', appointmentController.delete);

module.exports = router;