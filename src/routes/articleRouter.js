import Router from 'koa-router'
import {
    addArticle, delArticle, findAllArticle,
    findArticleById,
    findArticleUnderUser,
    findPartOfArticle,
    updateArticle
} from '../controllers/articleController.js'

const articleRouter = new Router({
    prefix: '/article',
})

// 添加文章
articleRouter.post('/add', addArticle)
// 查询所有文章
articleRouter.get('/find-all', findAllArticle)
// 查询部分文章
articleRouter.post('/find/list', findPartOfArticle)
// 查询单个文章
articleRouter.get('/find/articleId=:articleId', findArticleById)
// 查询用户下的所有文章
articleRouter.get('/find/userId=:userId', findArticleUnderUser)
// 修改文章
articleRouter.post('/update', updateArticle)
// 删除文章
articleRouter.post('/del', delArticle)

export default articleRouter