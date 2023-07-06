const CarIn = require('../models/CarIn')
const CarOut = require('../models/CarOut')

class FormController {
  render(req, res) {
    res.render('form')
  }

  async postData(req, res, next) {
    function extractCarNumber(filename) {
      const parts = filename.split('_')
      if (parts.length > 0) {
        const carNumber = parts[0]
        return carNumber
      }
      return ''
    }

    try {
      const carNumberIn = extractCarNumber(
        req.files['imageCarNumberIn'][0].originalname
      )
      const carNumberOut = extractCarNumber(
        req.files['imageCarNumberOut'][0].originalname
      )

      const carIn = new CarIn({
        imageInFirst: req.files['imageInFirst'][0].buffer,
        imageInSecond: req.files['imageInSecond'][0].buffer,
        imageCarNumberIn: req.files['imageCarNumberIn'][0].buffer,
        carNumberIn,
        timeIn: req.body.timeIn,
      })

      const carOut = new CarOut({
        imageOutFirst: req.files['imageOutFirst'][0].buffer,
        imageOutSecond: req.files['imageOutSecond'][0].buffer,
        imageCarNumberOut: req.files['imageCarNumberOut'][0].buffer,
        carNumberOut,
        timeOut: req.body.timeOut,
      })

      await carIn.save()
      await carOut.save()

      res.redirect('/')
    } catch (error) {
      console.error(error)
      res.status(500).send('Có lỗi khi upload dữ liệu')
    }
  }

  async postDataByJson(req, res, next) {
    try {
      const jsonData = req.file.buffer.toString('utf8')
      const carsData = JSON.parse(jsonData)

      const validCarsData = carsData.filter((carData) => {
        return carData?.carNumber && carData?.timeIn && carData?.timeOut
      })

      Car.insertMany(validCarsData).then(() => {
        res.redirect('/')
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Có lỗi khi upload dữ liệu')
    }
  }
}

module.exports = new FormController()
