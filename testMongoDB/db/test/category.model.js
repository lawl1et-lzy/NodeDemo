const Mongoose = require('mongoose');
const Schema = Mongoose.Schema

let category = {
  id: {
    type: Number
  },
  pid: {
    type: Number
  },
  name: {
    type: String
  },
  status: {
    type: Number,
  }
}

let config = {
  versionKey: false,
  timestamps: { 
    // 创建时间
    createdAt: 'createTime',
    // 最后一次更新时间
    updatedAt: 'updateTime' 
  }
}

let Category = new Schema(category, config)
Mongoose.model('category', Category)