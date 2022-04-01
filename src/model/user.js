import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    phoneNumber: Number,
    password: String,
})

const User = mongoose.model('user', userSchema)

export default User
