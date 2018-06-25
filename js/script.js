$(document).ready(function () {
	'use strict';
	
	// a default값 클릭 방지
	$(document).on('click', 'a[href="#"]', function(e) {
		e.preventDefault();
	}); 
	
	// mobile - hamburger menu script
	applyHamburgerMenu('#header .top_wrapper');
	
	function applyHamburgerMenu(selector) {
		var btn_open = $(selector).find('.btn_hamburger');
		var btn_close = $(selector).find('.btn_close');
		var nav = $(selector).find('.nav_wrapper');
		
		// mobile - hamburger menu script | open
		$(btn_open).on('click', function() {
			$(nav).css({
				'width': '75%',
				'right': 0,
				'boxShadow': '0 0 600px rgba(0,0,0,1)',
				'transition': 'all .6s ease-out'
			});
			
			$(nav).children('.gnb, .tnb').css({
				'opacity': 1,
				'transition': 'all .4s ease-out',
				'transitionDelay': '.5s'
			});
		});
		
		// mobile - hamburger menu script | close
		$(btn_close).on('click', function() {
			$(nav).css({
				'width': 0,
				'right': '-60px',
				'transition': 'all .6s ease-in',
				'boxShadow': '0 0 600px rgba(0,0,0,0)',
				'transitionDelay': '.4s'
			});
			$(nav).children('.gnb, .tnb').css({
				'opacity': 0,
				'transition': 'all .4s ease-in',
				'transitionDelay': 0
			});
		});
	}
	
	// btn_top display script
	applyScrollTop('.btn_top');
	
	function applyScrollTop(selector) {
		var point = $('#green_deal, #products').offset();
		
		$(window).on('scroll', function() {
			if ( point.top <= $(document).scrollTop() ) {
				$(selector).css({'opacity': 1});
			} else {
				$(selector).css({'opacity': 0});
			}
		});
	}
	
	// banner_slider script
	applyBannerSlider('#header', 1, 4000, 'play');
	
	function applyBannerSlider(selector, first, speed, status) {
		var numSlide = $(selector).find('.banner_slider ul li.slider').length;
		var slideNow = 0;
		var slideNext = 0;
		var slidePrev = 0;
		
		var timerId = '';
		var timerSpeed = speed;
		var timerStatus = status;
		
		$(selector).find('.banner_slider ul li.slider').each(function(i) {
			$(this).css({'left': (i * 100) + '%', 'display': 'block'});
		});
		
		$(selector).find('.banner01 a.btn_prev').on('click', function() {
			$(this).stop(true).animate({'left': '-200px'}).animate({'left': '0px'});
			showSlide(slidePrev);
		});
		
		$(selector).find('.banner01 a.btn_next').on('click', function() {
			$(this).stop(true).animate({'right': '-200px'}).animate({'left': '0px'});
			showSlide(slideNext);
		});
		
		showSlide(first);
		
		function showSlide(n) {
			clearTimeout(timerId);
			if( slideNow === 0 ) {
				$(selector).find('.banner_slider ul').css({
					'transition': 'left 0.6s ease-in-out',
					'left': (-( n-1 ) * 100) + '%'
				});
			} else {
				$(selector).find('.banner_slider ul').css({
					'transition': 'left 1.2s ease-in-out',
					'left': (-( n-1 ) * 100) + '%'
				});
			}
			
			$(selector).find('.banner_slider ul').css({'left': (-(n - 1) * 100) + '%'});
			
			slideNow = n;
			slidePrev = ((n - 1) < 1) ? numSlide : n - 1;
	        slideNext = ((n + 1) > numSlide) ? 1 : n + 1;
			
			if ( timerStatus === 'play') { 
				timerId = setTimeout(function() { showSlide(slideNext); }, timerSpeed); 
			}
		}
	}
});
