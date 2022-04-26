// 底层数据库处理封装函数

/**
 * 添加数据
 * @param {*} ctx 上下文对象
 * @param {*} model 数据库模型
 * @param {*} paramsObj 参数对象
 * @returns 添加结果
 */
export const add = async (ctx, model, paramsObj) => {
    try {
        return await model.create(paramsObj)
    } catch (error) {
        ctx.body = {
            code: "500",
            message: "添加失败"
        }
        console.error(error)
    }
}

/**
 * 根据id删除某个数据
 * @param {*} ctx 上下文对象
 * @param {*} model 数据库模型
 * @param {*} id 要删除数据的id
 * @returns 删除结果
 */
export const del = async (ctx, model, id) => {
    try {
        return await model.findOneAndDelete({ _id: id })
    } catch (error) {
        ctx.body = {
            code: "500",
            message: '删除失败'
        }
        console.error(error)
    }
}

export const delByKey = async (ctx, model, { key, value }) => {
    try {
        const obj = {}
        obj[key] = value
        return await model.findOneAndDelete(obj)
    } catch (error) {
        ctx.body = {
            code: "500",
            message: '删除失败'
        }
        console.error(error)
    }
}

/**
 * 根据id修改数据
 * @param {*} ctx 上下文对象
 * @param {*} model 数据库模型
 * @param {*} id 要修改数据的id
 * @param {*} updateObj 要修改的数据对象
 * @returns 修改结果
 */
export const update = async (ctx, model, id, updateObj) => {
    try {
        return await model.updateOne({ _id: id }, updateObj)
    } catch (error) {
        ctx.body = {
            code: '500',
            message: '修改失败'
        }
        console.error(error)
    }
}

/**
 * 查询所有数据
 * @param {*} ctx 上下文对象
 * @param {*} model 数据库模型
 * @param {*} where 查询条件
 * @returns 查询结果
 */
 export const find = async (ctx, model, where = null) => {
    try {
        return await model.find(where);
    } catch (error) {
        ctx.body = {
            code: "500",
            message: "查询失败",
        };
        console.error(error);
    }
};

/**
 * 查询单个数据
 * @param {*} ctx 上下文对象
 * @param {*} model 数据库模型
 * @param {*} id 要查询数据的id
 * @returns 查询结果
 */
export const findOne = async (ctx, model, id) => {
    try {
        return await model.findOne({ _id: id });
    } catch (error) {
        ctx.body = {
            code: "500",
            message: "查询失败",
        };
        console.error(error);
    }
};

/**
 *
 * @param {*} ctx 上下文对象
 * @param {*} model 数据库模型
 * @param {*} key 要查询的键名
 * @param {*} value 要查询的键名对应的值
 * @param {*} isExact 是否精确匹配，默认为true
 * @returns 符合条件的数据
 */
export const findByKey = async (ctx, model, { key, value, isExact = true }) => {
    try {
        const obj = {};

        if (isExact) {
            obj[key] = value;
            return await model.findOne(obj);
        } else {
            const reg = new RegExp(value, "i");
            obj[key] = reg;
            return await model.find(obj);
        }
    } catch (error) {
        ctx.body = {
            code: "500",
            message: "查询失败",
        };
        console.error(error);
    }
};
