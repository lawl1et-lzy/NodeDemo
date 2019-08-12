/**
 * 多表关联demo
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema

const authorSchema = {
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
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author'
  }
}

const Author = new Schema(authorSchema)
const Post = new Schema(postSchema)
const Comments = new Schema(commentsSchema)

Mongoose.model('author', Author)
Mongoose.model('post', Post)
Mongoose.model('comments', Comments)