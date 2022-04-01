import combineRouters from 'koa-combine-routers'
import articleRouter from './articleRouter.js'
import chatRecordRouter from './chatRecordRouter.js'
import uploadRouter from './uploadRouter.js'
import userInfoRouter from './userInfoRouter.js'
import userRouter from './userRouter.js'

// 合并所有路由
const router = combineRouters(
    userRouter,
    userInfoRouter,
    chatRecordRouter,
    articleRouter,
    uploadRouter
)

export default router
