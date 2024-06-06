const express = require('express')

const router = express.Router();
const clientController = require('../controller/client.controller');

router.get('/', clientController.findAll);

router.post('/', clientController.create);

router.get('/:id', clientController.findById);

//router.put('/:id', clientController.update);
router.post('/put/:id', clientController.update)

//.delete('/:id', clientController.delete);
router.get('/delete/:id', clientController.delete)

module.exports = router;