const mongoose = require('mongoose')

const carsOutSchema = new mongoose.Schema({
  imageCar: String,
})
const CarOut = mongoose.model('CarOut', carsOutSchema)

module.exports = CarOut
