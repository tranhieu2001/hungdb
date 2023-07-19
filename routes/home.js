const express = require('express')
const router = express.Router()

const homeController = require('../controllers/HomeController')

router.get('/', homeController.render)
router.post('/capture', homeController.capture)

module.exports = router
