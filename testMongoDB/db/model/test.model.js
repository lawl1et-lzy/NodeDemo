/**
 * 多表关联demo
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema

const authorSchema = {
  id: {
    type: String,
    default: Mongoose.Types.ObjectId
  },
  name: String,
  age: Number,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ]
}

const postSchema = {
  id: {
    type: String,
    default: Mongoose.Types.ObjectId
  },
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ]
}

const commentsSchema = {
  id: {
    type: String,
    default: Mongoose.Types.ObjectId
  },
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author'
  }
}

const Author = new Schema(authorSchema)
const Post = new Schema(postSchema)
const Comments = new Schema(commentsSchema)

Mongoose.model('author', Author, 'lawliet_Author')
Mongoose.model('post', Post)
Mongoose.model('comments', Comments)