const express = require('express')

const router = express.Router();
const vetController = require('../controller/vet.controller');

router.get('/', vetController.findAll);

router.post('/', vetController.create);

router.get('/:id', vetController.findById);

//router.put('/:id', vetController.update);
router.post('/put/:id', vetController.update);

//router.delete('/:id', vetController.delete);
router.get('/delete/:id', vetController.delete);

module.exports = router;