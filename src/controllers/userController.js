import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import secret from '../secret.js'
import { searchParams } from '../utils/common.js'
import { add, findByKey } from './crudUtil.js'
import { initUserInfo } from './userInfoController.js'

// 用户登录与注册
export const login = async (ctx) => {
    const { phoneNumber, password } = ctx.request.body

    const result = await findByKey(ctx, User, searchParams('phoneNumber', phoneNumber))

    if (result) {
        if (result.password === password) {
            const token = jwt.sign({ phoneNumber }, secret, {
                expiresIn: 60 * 10,
            })

            ctx.body = {
                code: 0,
                message: '登录成功',
                userId: result._id,
                token,
            }
        } else {
            ctx.body = {
                code: 1,
                message: '密码错误',
            }
        }
    } else {
        // 用户不存在的情况下可以帮用户直接注册一个账号
        const { _id } = await add(ctx, User, {
            username: phoneNumber.slice(0, 5),
            phoneNumber,
            password,
        })

        // 初始化用户信息
        initUserInfo(ctx, _id, phoneNumber.slice(0, 5), 'path')

        const token = jwt.sign({ phoneNumber }, secret, {
            expiresIn: 60,
        })

        ctx.body = {
            code: 0,
            message: '登录成功',
            token,
        }
    }
}
