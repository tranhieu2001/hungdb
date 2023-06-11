const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const { Car } = require('./models')

function controllers(app) {
  app.get('/', (req, res) => {
    Car.find({})
      .exec()
      .then((cars) => {
        res.render('home', { users: cars.map((car) => car.toObject()) })
      })
      .catch((err) => {
        console.error(err)
        res.render('home', { error: 'Đã xảy ra lỗi khi lấy dữ liệu' })
      })
  })

  app.post('/car/:id', (req, res, next) => {
    Car.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/'))
      .catch(next)
  })

  app.get('/form', (req, res) => {
    res.render('form')
  })

  app.get('/json', (req, res) => {
    res.render('json')
  })

  app.post('/form', upload.single('image'), (req, res, next) => {
    const { carNumber, timeIn, timeOut } = req.body
    const image = req.file.buffer
    const user = new Car({ carNumber, timeIn, timeOut, image })
    user
      .save()
      .then(() => res.redirect('/'))
      .catch(next)
  })
}

module.exports = controllers
