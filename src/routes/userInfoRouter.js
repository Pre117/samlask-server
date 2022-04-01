import Router from "koa-router";
import { findUserInfoByUserId } from "../controllers/userInfoController.js";

const userInfoRouter = new Router({
    prefix: '/user-info'
})

// 通过用户id查询用户信息
userInfoRouter.post('/find', findUserInfoByUserId)

export default userInfoRouter