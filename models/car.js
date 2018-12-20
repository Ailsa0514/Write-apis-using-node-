// 1 引入 mongoose

const mongoose = require('mongoose');

// 2 创建schema
const Schema = mongoose.Schema;

// 3 创建schema 映射
const carSchema = new Schema({
    make: String,
    mode: String,
    year: Number,
    seller: {
        type:Schema.Types.ObjectId,
        ref: 'user'
    }
})

// 4 创建模型
const Car = mongoose.model('car',carSchema);

module.exports = Car;