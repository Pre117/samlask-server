import {
    createReadStream,
    createWriteStream,
    existsSync,
    mkdirSync,
    readdirSync,
    rmdirSync,
    unlinkSync
} from 'fs'
import multer from 'koa-multer'
import { resolve as resolvePath } from 'path'

// 设置multer的硬盘存储引擎来控制文件的存储
const storage = multer.diskStorage({
    // 设置文件存储位置
    destination: function (req, file, cb) {
        let dir = './public/uploads/'
        const reg = /-\d{1,}$/
        if (reg.test(file.originalname)) {
            dir += file.originalname.replace(reg, '-dir')
        }

        // 如果目录不存在，则创建一个对应目录
        if (!existsSync(dir)) {
            mkdirSync(dir, {
                recursive: true,
            })
        }

        cb(null, dir)
    },

    // 设置存储的文件名称
    filename: function (req, file, cb) {
        const fileName = file.fieldname + '-' + Date.now() + '-' + file.originalname
        cb(null, fileName)
    },
})

export const uploadMulter = multer({ storage: storage })

// 上传多个文件
export const uploadMultipleFiles = async (ctx) => {
    const pathList = []

    ctx.req.files.map((file) => {
        const path = ctx.origin + '' + file.path.replace('public', '')
        pathList.push(path)
        console.log('upload file success! file path is: ', path)
    })

    ctx.body = {
        result: {
            message: 'upload file success!',
            pathList
        }
    }
}

// 合并上传的文件分片
export const mergeFileSlices = async (ctx) => {
    const { filename, size } = ctx.request.body
    const filePath = resolvePath('./public/uploads', `file-${Date.now()}-${filename}`)

    await mergeFileChunk(filePath, filename, size)

    ctx.body = {
        result: {
            message: 'merge file success!',
            filePath
        },
    }
}

const mergeFileChunk = async (filePath, filename, size) => {
    const chunkDir = resolvePath('./public/uploads', `${filename}-dir`)
    const chunkPaths = readdirSync(chunkDir).map((value) => chunkDir + '\\' + value)

    await Promise.all(
        chunkPaths.map((chunkPath, index) =>
            pipeStream(
                resolvePath(chunkDir, chunkPath),
                createWriteStream(filePath, {
                    start: index * size,
                    end: (index + 1) * size,
                })
            )
        )
    )
    rmdirSync(chunkDir)
}

const pipeStream = (path, writeStream) =>
    new Promise((resolve) => {
        const readStream = createReadStream(path)
        readStream.on('end', () => {
            unlinkSync(path)
            resolve()
        })
        readStream.pipe(writeStream)
    })
