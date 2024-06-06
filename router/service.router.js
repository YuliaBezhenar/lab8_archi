const express = require('express')

const router = express.Router();
const serviceController = require('../controller/service.controller');

router.get('/', serviceController.findAll);

router.post('/', serviceController.create);

router.get('/:id', serviceController.findById);

router.put('/:id', serviceController.update);

router.delete('/:id', serviceController.delete);

module.exports = router;