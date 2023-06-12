const { default: mongoose } = require('mongoose')

const URI = 'mongodb://localhost:27017/datatest'

async function connect() {
  try {
    await mongoose.connect(URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}

module.exports = connect
