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
}

module.exports = new HomeController()
