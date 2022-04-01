import Router from 'koa-router'
import verifyToken from '../controllers/tokenVerify.js'
import { login } from '../controllers/userController.js'

const userRouter = new Router({
    prefix: '/user',
})

// 用户登录
userRouter.post('/login', login)
// test
userRouter.post('/verify', verifyToken)

export default userRouter
