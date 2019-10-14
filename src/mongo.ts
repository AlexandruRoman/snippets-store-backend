import * as mongoose from 'mongoose'
const url = 'mongodb+srv://admin:admin123@cluster0-cupl8.mongodb.net/test?retryWrites=true'

export const connect = () => {
    mongoose.connect(url)
    return
}
