const mongoose = require('mongoose')

const carsInSchema = new mongoose.Schema({
  path: {
    type: String,
    require: true,
  },
})
const CarIn = mongoose.model('CarIn', carsInSchema)

module.exports = CarIn
