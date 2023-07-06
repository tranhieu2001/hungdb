const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const uploadImages = upload.fields([
  { name: 'imageInFirst', maxCount: 1 },
  { name: 'imageInSecond', maxCount: 1 },
  { name: 'imageCarNumberIn', maxCount: 1 },
  { name: 'imageOutFirst', maxCount: 1 },
  { name: 'imageOutSecond', maxCount: 1 },
  { name: 'imageCarNumberOut', maxCount: 1 },
])

const formController = require('../controllers/FormController')

router.get('/', formController.render)
router.post('/', uploadImages, formController.postData)
router.post('/json', upload.single('jsonFile'), formController.postDataByJson)

module.exports = router
