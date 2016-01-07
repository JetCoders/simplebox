/**
 * jQuery simplebox v1.0.0
 * Copyright (c) 2016 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function( $ ){
	
	/**
	 * Private methods 
	 */
	var _condition = function(id, options){
		if($.simplebox.modal){
			var data = $.simplebox.modal.data('simplebox');
			data.onClose($.simplebox.modal);
			$.simplebox.modal.fadeOut(data.duration, function(){
				$.simplebox.modal.css({left: '-9999px', top: '-9999px'}).show();
				data.afterClose($.simplebox.modal);
				$.simplebox.modal.removeData('simplebox');
				$.simplebox.modal = false;
				_toPrepare(id, options);
			});
		}
		else _toPrepare(id, options);
	},
	
	_calcWinWidth = function(){
		return ($(document).width() > $('body').width()) ? $(document).width() : jQuery('body').width();
	},
	
	_toPrepare = function(id, options){
		$.simplebox.modal = $(id);
		$.simplebox.modal.data('simplebox', options);
		var data = $.simplebox.modal.data('simplebox');
		
		data.btnClose = $.simplebox.modal.find(data.linkClose);
		
		var popupTop = $(window).scrollTop() + ($(window).height()/2) - $.simplebox.modal.outerHeight(true)/2;
		
		if ($(window).scrollTop() > popupTop) popupTop = $(window).scrollTop();
		if (popupTop + $.simplebox.modal.outerHeight(true) > $(document).height()) popupTop = $(document).height() - $.simplebox.modal.outerHeight(true);
		if (popupTop < 0) popupTop = 0;
		if (!data.positionFrom) {
			$.simplebox.modal.css({
				zIndex:1000,
				top: data.fixed ? 0 : popupTop,
				left: data.fixed ? 0 : _calcWinWidth()/2 - $.simplebox.modal.outerWidth(true)/2
			}).hide();
		}
		else{
			$.simplebox.modal.css({
				zIndex:1000,
				top: $(data.positionFrom).offset().top + $(data.positionFrom).outerHeight(true),
				left: $(data.positionFrom).offset().left
			}).hide();
		}
		_initAnimate(data);
		_closeEvent(data, data.btnClose);
		if(data.overlay.closeClick) _closeEvent(data, $.simplebox.overlay);
	},
	
	_initAnimate = function (data){
		data.onOpen($.simplebox.modal);
		if(data.overlay){
			$.simplebox.overlay.css({
				background: data.overlay.color,
				opacity: data.overlay.opacity
			}).fadeIn(data.duration, function(){
				$.simplebox.modal.fadeIn(data.duration, function(){
					$.simplebox.busy = false; 
					data.afterOpen($.simplebox.modal);
					if ($(window).scrollTop() > $.simplebox.modal.offset().top && !data.fixed) $('html, body').animate({scrollTop: $.simplebox.modal.offset().top}, 500);
				});
			});
		}
		else{
			$.simplebox.overlay.fadeOut(data.duration);
			$.simplebox.modal.fadeIn(data.duration, function(){
				$.simplebox.busy = false; 
				data.afterOpen($.simplebox.modal);
				if ($(window).scrollTop() > $.simplebox.modal.offset().top) $('html, body').animate({scrollTop: $.simplebox.modal.offset().top}, 500);
			});
		}
	},
	
	_closeEvent = function(data, element){
		element.unbind('click.simplebox').bind('click.simplebox', function(){
			if(!$.simplebox.busy){
				$.simplebox.busy = true;
				data.onClose($.simplebox.modal);
				$.simplebox.modal.fadeOut(data.duration, function(){
					$.simplebox.modal.css({left: '-9999px', top: '-9999px'}).show();
					$.simplebox.overlay.fadeOut(data.duration, function(){
						data.afterClose($.simplebox.modal);
						$.simplebox.modal.removeData('simplebox');
						$.simplebox.modal = false;
						$.simplebox.busy = false
					});
				});
			}
			return false;
		});
	},

	/**
	 * Public methods 
	 */
	
	methods = {
		init : function( options ) {
			$(this).unbind('click.simplebox').bind('click.simplebox', function(){
				var data = $(this).data('simplebox');
				if(!$(this).hasClass(defaults.disableClass) && !$.simplebox.busy){
					$.simplebox.busy = true;
					_condition($(this).attr('href') ? $(this).attr('href') : $(this).data('href'), jQuery.extend(true, {}, defaults, options));
				}
				return false;
			});
			return this;
		},
		option: function(name, set){
			if(set){
				return this.each(function(){
					var data = $(this).data('simplebox');
					if(data) data[name] = set;
				});
			}
			else{
				var ar = [];
				this.each(function(){
					var data = $(this).data('simplebox');
					if(data) ar.push(data[name]);
				});
				if(ar.length > 1) return ar;
				else return ar[0];
			}
		}
	},
	
	/**
	 * Param:
	 * 
	 */
	
	defaults = {
		duration: 300,
		linkClose: '.close, .btn-close',
		disableClass: 'disabled',
		overlay: {
			box: 'simplebox-overlay',
			color: 'black',
			closeClick: true,
			opacity: 0.3
		},
		positionFrom: false,
		fixed: false,
		onOpen: function(){},
		afterOpen: function(){},
		onClose: function(){},
		afterClose: function(){}
	};
	
	$.fn.simplebox = function( method ) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.simplebox' );
			}
		}
	};
	
	$.simplebox = function(id, options){
		if(!$.simplebox.busy){
			$.simplebox.busy = true;
			_condition(id, jQuery.extend(true, {}, defaults, options));
		}
	};
	
	$.simplebox.init = function(){
		if(!$.simplebox.overlay){
			$.simplebox.overlay = jQuery('<div class="'+defaults.overlay.box+'"></div>');
			jQuery('body').append($.simplebox.overlay);
			$.simplebox.overlay.css({
				position: 'fixed',
				zIndex: 999,
				left:0,
				top:0,
				width: '100%',
				height: '100%',
				background: defaults.overlay.color,
				opacity: defaults.overlay.opacity
			}).hide();
		};
		$(document).unbind('keypress.simplebox').bind('keypress.simplebox', function(e){
			if ($.simplebox.modal && $.simplebox.modal.is(':visible') && e.keyCode == 27) {
				$.simplebox.close();
			}
		});
		$(window).bind('resize.simplebox', function(){
			if ($.simplebox.modal && $.simplebox.modal.is(':visible')) {
				var data = $.simplebox.modal.data('simplebox');
				if (!data.positionFrom) {
					$.simplebox.modal.animate({
						left: _calcWinWidth()/2 - $.simplebox.modal.outerWidth(true)/2
					}, {queue:false, duration: $.simplebox.modal.data('simplebox').duration});
				}
				else{
					$.simplebox.modal.animate({
						top: $(data.positionFrom).offset().top + $(data.positionFrom).outerHeight(true),
						left: $(data.positionFrom).offset().left
					}, {queue:false, duration: $.simplebox.modal.data('simplebox').duration});
				}
				
			}
		});
	};
	
	$.simplebox.close = function(){
		if($.simplebox.modal && !$.simplebox.busy){
			var data = $.simplebox.modal.data('simplebox');
			$.simplebox.busy = true;
			data.onClose($.simplebox.modal);
			$.simplebox.modal.fadeOut(data.duration, function(){
				$.simplebox.modal.css({left: '-9999px', top:'-9999px'}).show();
				if($.simplebox.overlay) $.simplebox.overlay.fadeOut(data.duration, function(){
					data.afterClose($.simplebox.modal);
					$.simplebox.modal.removeData('simplebox');
					$.simplebox.modal = false;
					$.simplebox.busy = false;
				});
				else{
					data.afterClose($.simplebox.modal);
					$.simplebox.modal.removeData('simplebox');
					$.simplebox.modal = false;
					$.simplebox.busy = false;
				}
			});
		}
	};
	
	$(document).ready(function() {
		$.simplebox.init();
	});
	
})( jQuery );