const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')

const homeController = require('../controllers/HomeController')

router.get('/', homeController.render)
router.post('/capture/:type', homeController.capture)

module.exports = router
