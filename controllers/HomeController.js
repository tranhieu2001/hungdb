const fs = require('fs')

const CarIn = require('../models/CarIn')
const CarOut = require('../models/CarOut')

class HomeController {
  async render(req, res) {
    try {
      const carIn = await CarIn.findOne().sort({ _id: -1 })
      const carOut = await CarOut.findOne().sort({ _id: -1 })

      res.render('home', { carIn: carIn.toObject(), carOut: carOut.toObject() })
    } catch (error) {
      console.error(error)
      res.status(500).send('Có lỗi khi tải dữ liệu')
    }
  }

  capture(req, res) {
    const imageData = req.body.imageData

    const imageDir = 'public/image'
    const fileName = `image_${Date.now()}.png`

    fs.writeFile(`${imageDir}/${fileName}`, imageData, 'base64', (err) => {
      if (err) {
        console.error('Lỗi khi lưu hình ảnh:', err)
        res.status(500).send('Lỗi khi lưu hình ảnh')
      } else {
        console.log('Hình ảnh đã được lưu:', fileName)
        res.send('Hình ảnh đã được lưu thành công.')
      }
    })
  }
}

module.exports = new HomeController()
