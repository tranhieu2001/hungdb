const multer = require('multer')

const CarIn = require('../models/CarIn')
const CarOut = require('../models/CarOut')

const { takeDataByClassCar } = require('../utils')

function getMulterOptions(destinationPath, fileName) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
      cb(null, fileName)
    },
  })
}

class HomeController {
  async render(req, res) {
    const [carIn, carOut] = await Promise.all([
      CarIn.findOne().sort({ _id: -1 }),
      CarOut.findOne().sort({ _id: -1 }),
    ])

    res.render('home', {
      carIn: carIn ? carIn.toObject() : null,
      carOut: carOut ? carOut.toObject() : null,
    })
  }

  capture(req, res) {
    const type = req.params.type
    const path = `images/captured/${type}`
    const fileName = 'captured_' + Date.now() + '.png'

    const upload = multer({
      storage: getMulterOptions(`./public/${path}`, fileName),
    })

    // Lưu ảnh vào local
    upload.single('screenshot')(req, res, (err) => {
      if (err) {
        console.error('Lỗi khi lưu ảnh chụp:', err)
        return res.status(500).json({ error: 'Lỗi khi lưu ảnh chụp' })
      }
      console.log('Ảnh đã được lưu thành công')
    })

    // Lưu path vào db
    const Model = takeDataByClassCar(type, CarIn, CarOut)

    const Car = new Model({ path: `/${path}/${fileName}` })

    Car.save()
      .then(() => {
        console.log('Lưu dữ liệu thành công')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

module.exports = new HomeController()
