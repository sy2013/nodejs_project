var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.post("/api/login",function(req,res){
	// express post参数接收。
	// 所有的post参数都被包装到req.body中
	  var username = req.body.username;
	  var pwd = req.body.pwd;
	  
	  var result = {
	  	status : 1,
	  	message : "登录成功"
	  }
	  
	  UserModel.find({username: username, pwd: pwd}, function( err, docs){
	  	   if( !err & docs.length > 0 ){
	  	   	     console.log("登录成功");
	  	   	     res.send(result);
	  	   	     location.href = "index2.ejs";
	  	   }else{
	  	   	  console.log("登录失败，请检查您的用户名或者密码");
	  	   	  result.status = -109;
	  	   	  result.message = "登录失败，请检查您的用户名或者密码";
	  	   	  res.send(result);
	  	   }
	  })
});
module.exports = router;
 