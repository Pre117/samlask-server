import mongoose from 'mongoose'

const chatRecordSchema = new mongoose.Schema({
    userAId: String,
    userBId: String,
    messageRecord: [
        {
            userId: String,
            message: String,
            date: String
        }
    ]
})

const ChatRecord = mongoose.model('chatRecord', chatRecordSchema)

export default ChatRecord