const mongoose = require('mongoose')

const carsInSchema = new mongoose.Schema({
  imageCar: String,
})
const CarIn = mongoose.model('CarIn', carsInSchema)

module.exports = CarIn
