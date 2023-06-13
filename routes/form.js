const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const formController = require('../controllers/FormController')

router.get('/', formController.render)
router.post('/', upload.single('image'), formController.postData)
router.post('/json', upload.single('jsonFile'), formController.postDataByJson)

module.exports = router
