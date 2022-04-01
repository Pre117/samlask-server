import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    userId: String,
    username: String,
    title: String,
    content: String,
    date: String,
    views: Number,
    likes: [],
    commentIds: [],
    collectors: [],
    tags: []
})

const Article = mongoose.model('article', articleSchema)

export default Article