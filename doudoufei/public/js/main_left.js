window.onload = function(){
	var open = true;
	$(".list li").click(function(){
		 event.stopPropagation();    
		if( open ){
			$(this).find("ul").css("display","block");
			
			open = false
		}else{
			$(this).find("ul").css("display","none");
			
			open = true;
		}
	})
	
}
