// page init
$(document).ready(function(){
	$('.simplebox').simplebox({
		overlay: {
			color: 'white',
			opacity: 0.7
		},
		onOpen: function(obj){console.log('onOpen', obj);},
		afterOpen: function(obj){console.log('afterOpen', obj);},
		onClose: function(obj){console.log('onClose', obj);},
		afterClose: function(obj){console.log('afterClose', obj);}
	});
	$('.simplebox2').simplebox({
		overlay: {
			color: 'black',
			opacity: 0.4
		},
		onOpen: function(obj){console.log('onOpen', obj);},
		afterOpen: function(obj){console.log('afterOpen', obj);},
		onClose: function(obj){console.log('onClose', obj);},
		afterClose: function(obj){console.log('afterClose', obj);}
	});
	$('.simplebox3').click(function(){
		$.simplebox($(this).attr('href'), {
			positionFrom: '.positionFrom',
			overlay: false,
			onOpen: function(obj){console.log('onOpen', obj);},
			afterOpen: function(obj){console.log('afterOpen', obj);},
			onClose: function(obj){console.log('onClose', obj);},
			afterClose: function(obj){console.log('afterClose', obj);}
		});
		return false;
	});
	$('.close2').click(function(){
		$.simplebox.close();
		return false;
	});
});