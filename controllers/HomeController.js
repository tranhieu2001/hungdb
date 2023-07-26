const fs = require('fs')

const CarIn = require('../models/CarIn')
const CarOut = require('../models/CarOut')

const { takeDataByClassCar } = require('../utils')

class HomeController {
  async render(req, res) {
    try {
      const carIn = await CarIn.findOne().sort({ _id: -1 })
      const carOut = await CarOut.findOne().sort({ _id: -1 })

      res.render('home', {
        carIn: carIn.toObject(),
        carOut: carOut.toObject(),
      })
    } catch (error) {
      res.render('home')
      console.error(error)
    }
  }

  async capture(req, res) {
    const imageData = req.body.imageData

    const type = req.params.type

    const fileName = `image_${Date.now()}.png`
    const imageDir = `public/image/${type}`

    fs.writeFile(`${imageDir}/${fileName}`, imageData, 'base64', (err) => {
      if (err) {
        console.error('Lỗi khi lưu hình ảnh:', err)
        res.status(500).send('Lỗi khi lưu hình ảnh')
      } else {
        console.log('Hình ảnh đã được lưu:', fileName)
        res.send('Hình ảnh đã được lưu thành công.')
      }
    })

    const dataCar = {
      imageCar: imageData,
    }

    const Model = takeDataByClassCar(type, CarIn, CarOut)

    const Car = new Model(dataCar)

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
