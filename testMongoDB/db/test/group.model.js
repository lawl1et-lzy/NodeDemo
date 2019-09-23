const Mongoose = require('mongoose');
const Schema = Mongoose.Schema

let group = {
  id: {
    type: Number
  },
  name: {
    type: String
  },
  status: {
    type: Number,
  },
  catgory: [{
    type: Schema.Types.ObjectId,
    ref: 'catgory'
  }],
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

let Group = new Schema(group, config)
Mongoose.model('group', Group)