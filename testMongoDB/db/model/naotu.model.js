const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

let naotu = {
  "id": String,
  "value": Object
}

let Naotu = new Schema(naotu)
Mongoose.model('naotu', Naotu)