var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodModel");
var multiparty = require('multiparty');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.get('/index2', function(req, res, next) {
  res.render('index2', {});
});

router.get('/first', function(req, res, next) {
  res.render('first', {});
});

router.get('/shop_add', function(req, res, next) {
	  // 检查用户是否登录
		if(req.session && req.session.username != null) {
			res.render("shop_add", {});
		} else {
			// 重定向
			res.redirect('/login');
		}
});

router.get('/shop_list', function(req, res){
	GoodsModel.find({}, function(err, docs) {
		res.render("shop_list", {list:docs});
	})
})

router.get('/api/add_good',function(req, res, next) {
    var Form = new multiparty.Form({
		    uploadDir: "./public/images"
	})
	    Form.parse(req, function(err, body, files){
			var good_name = body.good_name[0];
			var good_code = body.good_code[0];
			var good_price = body.good_price[0];			
			gm.save(function(err){
				if(!err) {
					res.send("商品保存成功");
				} else {
					res.send("商品保存失败");
				}
			})
		})
});

router.post("/api/login",function(req,res){
	// express post参数接收。
	// 所有的post参数都被包装到req.body中
		console.log(req.body);
	  var username = req.body.username;
	  var pwd = req.body.pwd;
	  console.log(username,pwd);
	  var result = {
	  	status : 1,
	  	message : "登录成功"
	  }
	  
	  UserModel.find({username: username, pwd: pwd}, function( err, docs){
	  	   if( !err && docs.length > 0 ){
	  	   	     console.log("登录成功");	  	   	     
	  	   	     res.send(result);
	  	   }else{
	  	   	  console.log("登录失败，请检查您的用户名或者密码");
	  	   	  result.status = -109;
	  	   	  result.message = "登录失败，请检查您的用户名或者密码";
	  	   	  res.send(result);
	  	   }
	  })
});
module.exports = router;
 