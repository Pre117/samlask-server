import Article from '../model/article.js'
import { searchParams } from '../utils/common.js'
import { add, del, find, findByKey, findOne, update } from './crudUtil.js'

// 添加文章
export const addArticle = async (ctx) => {
    const { articleInfo } = ctx.request.body

    const result = await add(ctx, Article, { ...articleInfo })

    ctx.body = {
        code: result ? 0 : 1,
    }
}

// 查询所有文章
export const findAllArticle = async (ctx) => {
    const result = await find(ctx, Article)

    ctx.body = {
        code: 0,
        result,
    }
}

// 查询部分文章
export const findPartOfArticle = async (ctx) => {
    const { limit, page } = ctx.request.body

    const list = await find(ctx, Article)

    // TODO 以views高低来排序

    // 拿到部分文章列表中的部分信息
    const result = list.slice((page - 1) * limit, page * limit).map((item) => {
        const { _id, username, title, content, date, tags, likes, views, commentIds, collectors } =
            item

        return {
            articleId: _id,
            username,
            title,
            contentPreview: content.slice(0, 20),
            date,
            tags,
            views,
            likeCount: likes.length,
            commentCount: commentIds.length,
            collectorCount: collectors.length,
        }
    })

    ctx.body = {
        code: 0,
        result,
    }
}

// 查询单个文章
export const findArticleById = async (ctx) => {
    const result = await findOne(ctx, Article, ctx.params.articleId)

    ctx.body = {
        code: 0,
        result,
    }
}

// 查询用户下的所有文章
export const findArticleUnderUser = async (ctx) => {
    const result = await findByKey(ctx, Article, searchParams('userId', ctx.params.userId, false))

    ctx.body = {
        code: 0,
        result,
    }
}

// 修改文章
export const updateArticle = async (ctx) => {
    const { articleId, articleInfo } = ctx.request.body

    await update(ctx, Article, articleId, articleInfo)

    ctx.body = { code: 0 }
}

// 删除文章
export const delArticle = async (ctx) => {
    const { articleId } = ctx.request.body

    await del(ctx, Article, articleId)

    ctx.body = { code: 0 }
}
