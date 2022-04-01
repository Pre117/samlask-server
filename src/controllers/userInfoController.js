import UserInfo from '../model/userInfo.js'
import { searchParams } from '../utils/common.js'
import { add, findByKey, update } from './crudUtil.js'

/**
 * 初始化用户信息
 * @param {*} ctx 上下文对象
 * @param {String} userId 用户id
 * @param {String} username 用户名
 * @param {String} avatar 头像地址
 */
export const initUserInfo = async (ctx, userId, username, avatar) => {
    await add(ctx, UserInfo, { userId, username, avatar, points: 0 })
}

// 修改用户信息
export const modifyUserInfo = async (ctx) => {
    const { userInfoId, userInfo } = ctx.request.body

    const result = await update(ctx, UserInfo, userInfoId, userInfo)

    console.log(result)
}

/**
 * 查询用户信息
 * @param {*} ctx 上下文对象
 */
export const findUserInfoByUserId = async (ctx) => {
    const { userId } = ctx.request.body

    const result = await findByKey(ctx, UserInfo, searchParams('userId', userId))
    
    ctx.body = {
        result
    }
}
