const mongoose = require('mongoose')

const carsOutSchema = new mongoose.Schema({
  path: {
    type: String,
    require: true,
  },
})
const CarOut = mongoose.model('CarOut', carsOutSchema)

module.exports = CarOut
