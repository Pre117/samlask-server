import Router from 'koa-router'
import { addChatRecord, findChatRecord, findUserChatRecord } from '../controllers/chatRecordController.js'

const chatRecordRouter = new Router({
    prefix: '/chat-record'
})

// 添加消息记录
chatRecordRouter.post('/add', addChatRecord)
// 查询两个用户之间的消息记录
chatRecordRouter.post('/find', findChatRecord)
// 查询用户与其他有聊天记录的用户
chatRecordRouter.get('/find/userId=:userId', findUserChatRecord)

export default chatRecordRouter