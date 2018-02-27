window.onload = function(){
	var open = true;
	$(".list li").click(function(){
		if( open ){
			$(this).find("ul").css("display","block");
			$(this).css("background","#575757 url(http://www.doudoufei.top/shops/admin/images/menu1_1.png) no-repeat 9px 0");
			open = false
		}else{
			$(this).find("ul").css("display","none");
			$(this).css("background","#575757 url(http://www.doudoufei.top/shops/admin/images/menu_1.png) no-repeat 9px 0");
			open = true;
		}
	})
	
}
