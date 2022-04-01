import mongoose from 'mongoose'

const userInfoSchema = new mongoose.Schema({
    userId: String,
    username: String,
    avatar: String,
    points: Number
})

const UserInfo = mongoose.model('userInfo', userInfoSchema)

export default UserInfo