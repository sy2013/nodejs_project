var express = require('express');
var router = express.Router();
var md5 = require("md5");
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require('multiparty');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});
router.post("/api/login",function(req,res){
	// express post参数接收。
	// 所有的post参数都被包装到req.body中
//		console.log(req.body);
	  var username = req.body.username;
	  var psw = req.body.psw;
	  console.log(username,psw);
	  var result = {
	  	status : 1,
	  	message : "登录成功"
	  }
	  
	UserModel.find({username: username, psw: psw}, function( err, docs){
	  	   if( !err && docs.length > 0 ){
	  	   	//在认证权限中存username
	  	   	req.session.username = username;
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
router.get('/index2', function(req, res, next) {
  res.render('index2', {});
});

router.get('/first', function(req, res, next) {
  res.render('first', {});
});

//删除
router.get('/api/goods_del', function(req, res) {
     GoodsModel.findByIdAndRemove({ _id : req.query.goodsId },function(err){
     	      var result = {
	     	      	  status : 1,
	     	      	  message : "商品删除成功"
     	      }
     	      if(err){
     	      	  result.status = -119;
     	      	  result.message = "商品删除失败";
     	      };
     	      res.send(result);
     });
});

//模糊查询操作
//router.post('/api/goods_search', function(req, res){
//	      console.log(req.body.keyword);
//  var keyword = req.body.keyword;
//  
//});

router.get('/api/goods_search',function(req, res){
	     console.log(req.query.keyword);
	    var keyword = req.query.keyword;
	   GoodsModel.find({goods_name : {$regex:keyword}},function(err,docs){
	   	       var result = {
	     	      	  status : 1,
	     	      	  message : "商品查找成功"
     	      };
     	      if(!err && docs.length > 0){
     	      	  console.log("查找成功");
     	      	   res.send(result);
     	      }else{
     	      	  console.log("查找失败");
     	      	  result.status = -120;
     	      	  result.message = "商品查找失败";
     	      	  res.send(result);
     	      }
     	      
	   } );	    
}); 



router.get('/shop_add', function(req, res) {
	  // 检查用户是否登录
		if(req.session && req.session.username != null) {
			res.render("shop_add", {});
		} else {
			// 重定向
			res.redirect('/');
		}
});

router.get('/shop_list', function(req, res){
	  var pageNo = parseInt(req.query.pageNo || 1);
	  var count = parseInt(req.query.count || 4);	  
	  var query = GoodsModel.find({}).skip( (pageNo-1)*count ).limit(count ).sort({data:-1});
	  query.exec(function( err,docs ){
//	     	console.log( docs );
	  	  res.render("shop_list", {list: docs,pageNo:pageNo,count:count});
	  });
//	GoodsModel.find({},function(err, docs) {
//		   console.log(docs);
//		res.render("shop_list", {list: docs});
//	})
});

router.post('/api/add_good',function(req, res) {
    var Form = new multiparty.Form({
		    uploadDir: "./public/images"
	})
	    Form.parse(req, function(err, body, files){
	    	console.log(body);
			var goods_name = body.goods_name[0];
			var goods_code = body.goods_code[0];
			var goods_price = body.goods_price[0];
//			console.log( goods_name,goods_code,goods_price );
			var  gm = new GoodsModel();
			console.log(gm);
		　　　　 gm.goods_name = goods_name;
		      gm.goods_code = goods_code;
		　　　　 gm.goods_price = goods_price;
			   gm.save(function(err){
				if(!err) {
					res.send("商品保存成功");
				} else {
					res.send("商品保存失败");
				}
			 })
		})
});


module.exports = router;
 