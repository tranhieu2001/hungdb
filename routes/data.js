const express = require('express')
const router = express.Router()

const dataController = require('../controllers/DataController')

router.get('/', dataController.render)
router.delete('/:type/:id', dataController.deleteCar)

module.exports = router
