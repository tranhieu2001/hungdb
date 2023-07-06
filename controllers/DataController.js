const CarIn = require('../models/CarIn')
const CarOut = require('../models/CarOut')

class DataController {
  async render(req, res) {
    try {
      const carInData = CarIn.find({}).exec()
      const carOutData = CarOut.find({}).exec()

      const [carIns, carOuts] = await Promise.all([carInData, carOutData])

      res.render('data', {
        carIns: carIns.map((car) => car.toObject()),
        carOuts: carOuts.map((car) => car.toObject()),
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Có lỗi khi tải dữ liệu')
    }
  }

  async deleteCar(req, res, next) {
    function deleteByModel(model, id) {
      model
        .deleteOne({ _id: id })
        .then(() => res.redirect('back'))
        .catch(next)
    }

    try {
      const type = req.params.type
      const id = req.params.id
      if (type === 'carin') {
        await deleteByModel(CarIn, id)
        res.redirect('/data')
      } else {
        await deleteByModel(CarOut, id)
        res.redirect('/data')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Có lỗi khi xóa')
    }
  }
}

module.exports = new DataController()
