import ChatRecord from '../model/chatRecord.js'
import { searchParams } from '../utils/common.js'
import { add, findByKey, update } from './crudUtil.js'

// 初始化聊天记录
const initChatRecord = async (ctx, userAId, userBId, messageInfo) => {
    return await add(ctx, ChatRecord, { userAId, userBId, messageRecord: [messageInfo] })
}

// 添加聊天记录
export const addChatRecord = async (ctx) => {
    const { userAId, userBId, messageInfo } = ctx.request.body
    // 查询聊天记录
    const recordResult = await findChatRecordByUserId(ctx, userAId, userBId)

    let result = null

    if (recordResult) {
        // 当聊天记录存在时，向其中添加新消息，
        result = await update(ctx, ChatRecord, recordResult._id, {
            messageRecord: [...recordResult.messageRecord, messageInfo],
        })
    } else {
        // 当聊天记录不存在时，初始化
        result = initChatRecord(ctx, userAId, userBId, messageInfo)
    }

    ctx.body = {
        code: result ? 0 : 1,
    }
}

/**
 * 查询两个用户之间的聊天记录，有两种情况：
 * 1、userAId与userBId就是它自己本身
 * 2、userAId与userBId的值互换
 * @param {*} ctx 上下文对象
 * @param {*} userAId 用户Id
 * @param {*} userBId 另一个用户Id
 * @returns 查询结果
 */
const findChatRecordByUserId = async (ctx, userAId, userBId) => {
    // 第一种情况
    const recordListA = await findByKey(ctx, ChatRecord, searchParams('userAId', userAId, false))
    const resultA = recordListA.find((item) => item.userBId === userBId)
    if (resultA) {
        return resultA
    }

    // 第二种情况
    const recordListB = await findByKey(ctx, ChatRecord, searchParams('userBId', userAId, false))
    const resultB = recordListB.find((item) => item.userAId === userBId)
    if (resultB) {
        return resultB
    }

    // 不存在聊天记录
    if (!resultA && !resultB) {
        return null
    }
}

/**
 * 查询两个用户之间的聊天记录
 * @param {*} ctx 上下文对象
 */
export const findChatRecord = async (ctx) => {
    const { userAId, userBId } = ctx.request.body

    const result = await findChatRecordByUserId(ctx, userAId, userBId)

    ctx.body = {
        code: result ? 0 : 1,
        result,
    }
}

/**
 * 查询用户与其他有过聊天记录的所有用户
 * @param {*} ctx 上下文对象
 */
export const findUserChatRecord = async (ctx) => {
    const userId = ctx.params.userId

    const listA = await findByKey(ctx, ChatRecord, searchParams('userAId', userId, false))
    const listB = await findByKey(ctx, ChatRecord, searchParams('userBId', userId, false))

    const newList = [...listA, ...listB].map((item) => {
        let temp = null

        if (item.userAId === userId) {
            temp = item.userBId
        } else if (item.userBId === userId) {
            temp = item.userAId
        }
        return {
            userId: temp,
            lastMessageInfo: item.messageRecord[item.messageRecord.length - 1]
        }
    })

    ctx.body = {
        result: newList,
    }
}
