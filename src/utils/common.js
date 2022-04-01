/**
 * 给定键值返回对应对象，用于fingByKey的搜索参数
 * @param {*} key 键
 * @param {*} value 值
 * @param {*} isExact 是否精确查找，默认为true
 * @returns 对应参数对象
 */
export const searchParams = (key, value, isExact = true) => {
    return {
        key, value, isExact
    }
}
