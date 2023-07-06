const mongoose = require('mongoose')

const carsInSchema = new mongoose.Schema({
  carNumberIn: String,
  timeIn: String,
  imageInFirst: Buffer,
  imageInSecond: Buffer,
  imageCarNumberIn: Buffer,
})
const CarIn = mongoose.model('CarIn', carsInSchema)

module.exports = CarIn
