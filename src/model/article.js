import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    userId: String,
    username: String,
    classification: Number,
    tags: [],
    abstract: String,
    title: String,
    content: String,
    date: String,
    views: Number,
    likes: [],
    commentIds: [],
    collectors: []
})

const Article = mongoose.model('article', articleSchema)

export default Article