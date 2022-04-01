// 用户注册参数校验
export const registerVerify = (ctx) => {
    ctx.verifyParams({
        phoneNumber: {
            type: 'number',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
    })
}