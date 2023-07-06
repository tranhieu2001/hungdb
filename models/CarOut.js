const mongoose = require('mongoose')

const carsOutSchema = new mongoose.Schema({
  carNumberOut: String,
  timeOut: String,
  imageOutFirst: Buffer,
  imageOutSecond: Buffer,
  imageCarNumberOut: Buffer,
})
const CarOut = mongoose.model('CarOut', carsOutSchema)

module.exports = CarOut
