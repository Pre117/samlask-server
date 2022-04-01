import Router from "koa-router";
import {
    mergeFileSlices,
    uploadMulter,
    uploadMultipleFiles
} from '../controllers/uploadController.js';

const uploadRouter = new Router({
    prefix: '/upload'
})

// 上传多个文件
uploadRouter.post('/files', uploadMulter.any(), uploadMultipleFiles)
// 合并上传的文件分片
uploadRouter.post('/merge', mergeFileSlices)

export default uploadRouter