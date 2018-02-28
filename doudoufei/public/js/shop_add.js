window.onload = function(){
	 $(".tabBar_p li").click(function(){
		$(this).css("background","#fefefe").siblings().css("background","#efefef");
		$("form table").eq( $(this).index()).css("display","block").substring().css("display","none");
	});
	
}
