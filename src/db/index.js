import mongoose from 'mongoose'

const url = 'mongodb://localhost:27017/samlask'

const MongooseConnect = async () => {
    try {
        await mongoose.connect(url, {useNewUrlParser: true})
        console.log('数据库连接成功！')
    } catch (err) {
        console.error('数据库连接失败：', err)
    }
}

export default MongooseConnect