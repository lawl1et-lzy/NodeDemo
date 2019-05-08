const Mongoose = require('mongoose');
const Schema = Mongoose.Schema

let product= {
  productID: { type: String},
  productName: String,
  salePrice: Number,
  checked: String,
  productNum: Number,
  productImage: String
}

let Product =  new Schema(product)
Mongoose.model('product', Product)