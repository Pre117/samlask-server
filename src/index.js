import { createServer } from 'http'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import jsonError from 'koa-json-error'
import koaParameter from 'koa-parameter'
import serve from 'koa-static'
import cors from 'koa2-cors'
import path from 'path'
import { Server } from 'socket.io'
import MongooseConnect from './db/index.js'
import router from './routes/index.js'

const app = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

const users = new Map()

io.on('connection', (socket) => {
    // 建立socket连接时，以userId为key，socket为value加入到映射中
    socket.on('new user enter', (userId) => {
        if (!users.has(userId)) {
            users.set(userId, socket)
        }
    })

    // 监听到来自客户端from的消息，再用目的地to的socket来发布信息
    socket.on('private message', (from, to, msg) => {
        if (users.has(to)) {
            users.get(to).emit('chat message', msg)
        }
    })

    socket.on('disconnect', () => {
        // 将离开聊天室的用户从用户组中删除
        for(let item of users.entries()) {
            if (item[1] === socket) {
                users.delete(item[0])
            }
        }
    })
})

// 连接数据
MongooseConnect()
// 处理错误
app.use(jsonError())
// 参数校验
app.use(koaParameter(app))
// 接收POST请求下的body，解析ctx.request.body
app.use(bodyParser())
// 解决跨域问题
app.use(cors())
// 路由
app.use(router())
// 访问静态资源
app.use(serve(path.join(path.resolve(), './public')))

httpServer.listen(9000, () => {
    console.log('服务器以启动！')
})
