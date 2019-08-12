require('../db/model/test.model.js')
const Mongoose = require('mongoose')
const AuthorModel = Mongoose.model('author')
const PostModel = Mongoose.model('post')
const CommentsModel = Mongoose.model('comments')

// 首次初始化
let init = async () => {
  try {
    let lawliet = new AuthorModel({
      name: 'lawliet',
      age: 27
    })

    let post = new PostModel({
      title: 'postTitle',
      content: 'postContent...'
    })

    let comments = new CommentsModel({
      content: 'commentsContent...'
    })

    let authorDoc = await lawliet.save()
    if(!authorDoc) return false
    post.author = authorDoc
    comments.author = authorDoc
    let postDoc = await post.save()
    let commentsDoc = await comments.save()
    if(!(postDoc && commentsDoc)) return false
    
    lawliet.posts.push(postDoc)
    lawliet.comments.push(commentsDoc)

    post.comments.push(commentsDoc)

    await lawliet.save()
    await post.save()
  } catch (error) {
    console.log(error)
  }
}
// init()

let findData = async () => {
  try {
    let authorDoc = await AuthorModel.findOne({}).populate([{path: 'posts', select: {'comments': 0}}, {path: 'comments'}]).exec()
    console.log('authorDoc', authorDoc)
  } catch (error) {
    
  }
}
findData()

