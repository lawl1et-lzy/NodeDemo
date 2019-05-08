const Mongoose = require('mongoose');
const Schema = Mongoose.Schema

let user = {
  username: String,
  password: String,
  createdAt: Date
}

let User = new Schema(user)
Mongoose.model('user', User)