const Car = require('../models/car')

class FormController {
  render(req, res) {
    res.render('form')
  }

  postData(req, res, next) {
    const { carNumber, timeIn, timeOut } = req.body
    const image = req.file.buffer
    const user = new Car({ carNumber, timeIn, timeOut, image })

    user
      .save()
      .then(() => res.redirect('/'))
      .catch(next)
  }

  postDataByJson(req, res, next) {
    const jsonData = req.file.buffer.toString('utf8')
    const carsData = JSON.parse(jsonData)

    const validCarsData = carsData.filter((carData) => {
      return carData?.carNumber && carData?.timeIn && carData?.timeOut
    })

    Car.insertMany(validCarsData)
      .then(() => {
        res.redirect('/')
      })
      .catch(next)
  }
}

module.exports = new FormController()
