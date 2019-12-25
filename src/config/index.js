require('dotenv').config()
const mongoose = require('mongoose')

const config = {
  MONGO_URL: process.env.MONGO_URL,
  TOKEN: process.env.TOKEN
}

mongoose.Promise = global.Promise
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`[INFO] Connected to database: ${config.MONGO_URL}`))
  .catch(console.error)

module.exports = config