var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 创建文档的定义
var Good = new Schema({
    good_name  : String,
    good_code : String,
    good_price : String,   
    create_date : { type: Date, default: Date.now }
});

//创建model对象，与数据库中的文档（表）映射
var GoodModel = mongoose.model("good",Good);
// commonJS规范(暴露接口)
module.exports = GoodModel;
