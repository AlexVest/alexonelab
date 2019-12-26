const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  money: {
    type: Number,
    default: 500
  }
})

module.exports = mongoose.model('User', schema)