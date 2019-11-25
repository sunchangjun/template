/*
 
 * 17素材vip建站专区模块代码
 * 详尽信息请看官网：http://www.17sucai.com/pins/vip
 *
 * Copyright , 温州易站网络科技有限公司版权所有
 * 图片不能商用，代码可商用。
 
 * 请尊重原创，未经允许请勿转载。
 * 在保留版权的前提下可应用于个人或商业用途
 
*/

//语言
$(".language-btn").hover(
	function() {
		$(".language-select").show();
	},
	function() {
		$(".language-select").hide();
	}
);
//二级导航
var henghost = {};
$('[_h_nav]').hover(function() {
	var _nav = $(this).attr('_h_nav');
	clearTimeout(henghost[_nav + '_timer']);
	henghost[_nav + '_timer'] = setTimeout(function() {
		$('[_h_nav]').each(function() {
			$(this)[_nav == $(this).attr('_h_nav') ? 'addClass' : 'removeClass']('active');
			if($(this).attr('_h_nav')) {
				$("header").addClass('top-menu-header');
			} else {
				$("header").removeClass('top-menu-header');
				$("header").removeClass('top-menu-header').stop(true, true).slideDown(300);
			}
		});
		$('#' + _nav).stop(true, true).slideDown(300);
	}, 150);
}, function() {
	var _nav = $(this).attr('_h_nav');
	clearTimeout(henghost[_nav + '_timer']);
	henghost[_nav + '_timer'] = setTimeout(function() {
		$('[_h_nav]').removeClass('active');
		$("header").removeClass('top-menu-header').stop(true, true).slideDown(200);
		$('#' + _nav).stop(true, true).slideUp(100);
	}, 150);

});

//滚动顶部固定
var offset = 300;
$(window).scroll(function() {
	($(this).scrollTop() > offset) ? $('.pricing-navbar').addClass('fixed'): $('.pricing-navbar').removeClass('fixed');
	($(this).scrollTop() > 36) ? $('.header').addClass('fixed pulse').find('.topnav').hide(): $('.header').removeClass('fixed pulse').find('.topnav').show();
	($(this).scrollTop() > 36) ? $('.subnav').addClass('fixed'): $('.subnav').removeClass('fixed');
})

//轮播图
jQuery(".slideBox").slide({
	mainCell: ".bd ul",
	effect: "left",
	autoPlay: true,
	trigger: "click"
});