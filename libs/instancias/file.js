var hei = $('#headertop').height();

$.loop_movil(function(){
	TL.movil = true;
},function() {
	TL.movil = false;
});

TL.plataform.save = function(element,data,ok) {
}

$(function() {
	new f(".session").on({
		session:function(load) {
			$(load).removeClass("session");
		}
	});

	TL.loadIns("123456789",function() {
		console.log("FIN");
		window.sr = new scrollReveal();
	});

	$('html, body').animate({
		scrollTop: $("body").offset().top
	}, 1000);
});