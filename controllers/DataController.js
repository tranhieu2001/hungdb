const Car = require('../models/car')

class DataController {
  render(req, res) {
    Car.find({})
      .exec()
      .then((cars) => {
        res.render('data', { users: cars.map((car) => car.toObject()) })
      })
      .catch((err) => {
        console.error(err)
        res.render('data', { error: 'Đã xảy ra lỗi khi lấy dữ liệu' })
      })
  }

  deleteCar(req, res, next) {
    Car.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}

module.exports = new DataController()
