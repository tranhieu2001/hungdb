const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
  timeIn: String,
  timeOut: String,
  carNumber: String,
  image: Buffer,
})
const Car = mongoose.model('Car', carsSchema)

module.exports = { Car }
