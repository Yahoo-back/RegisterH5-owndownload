function popup(contents) {
	if ($('.alert-tip').length == 0) {
		var html = '<div class="alert-tip">' + contents + '</tip>';
		var div = $(html);
		$('body').append(div);
		setTimeout(function () {
			div.remove();
		}, 2000)
	}
}

function popup2(tit, contents, btnl, btnr) {
	if ($('.alert-tip2').length == 0) {
		var html = '<div class="alert-tip2"><h2>' + tit + '</h2><div class="alert-tip2-con">' + contents + '</div><div class="alert-tip2-bottom d-webkit"><button type="button" class="cancel box-flex">' + btnl + '</button><a class="sure box-flex" href="download.html" >' + btnr + '</a></div></div><div class="layer"></div>';
		var div = $(html);
		$('body').append(div);
	}
}
var date = new Date();
var timer = date.getTime().toString();
$.ajax({
	type: "get",
	dataType: "json",
	url: "js/mess.json?t=" + timer
}).done(function (data) {
	var notice = '',
		comment = '';
	$.each(data.data.carouselList, function (k, v) {
		notice += ' <li class="swiper-slide">' +
			v.content + '</li>';
	});
	$.each(data.data.commentsList, function (k, v) {
		comment += '<dl class="d-webkit">' +
			'<dt><img src="' + v.url + '"> </dt>' +
			'<dd class="box-flex"><h2>' + v.username + '<span>' + v.mobile + '</span></h2>'
		+'<h4>' + v.dataCreateTime + '</h4>'
		+'<h3>' + v.comments + '</h3>'
		+'</dd></dl>';
	});

	$('.notice .swiper-wrapper').append(notice);
	$('#con1').append(comment);
	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		autoplay: true,
		effect: 'slide',
		loop: true,
		speed: 300,
		height: 30,
	});
	function addKeyFrames(y){
		var style = document.createElement('style');
		style.type = 'text/css';
		var keyFrames = '\
		@-webkit-keyframes rowup {\
			0% {\
				-webkit-transform: translate3d(0, 0, 0);\
				transform: translate3d(0, 0, 0);\
			}\
			100% {\
				-webkit-transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
				transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
			}\
		}\
		@keyframes rowup {\
			0% {\
				-webkit-transform: translate3d(0, 0, 0);\
				transform: translate3d(0, 0, 0);\
			}\
			100% {\
				-webkit-transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
				transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
			}\
		}';
		style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, y);
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	
	var con2=$('#con1').clone();	
	 $(".con").append(con2);
		var height = document.querySelector('#con1').offsetHeight; 
		addKeyFrames( '-'+height+'px' );
		document.querySelector('.con').className += ' rowup'; 

})

function download() {
	window.location.href="./download.html"
	// $('.success').removeClass('hide');
	// $('.layer').removeClass('hide')
	// $('.layer2').removeClass('hide')
}

$(document).on('click', '.alert-tip2 .cancel', function () {
	$('.alert-tip2').remove();
	$('.layer').remove();
	num = 0;
})
var countdown = 60;
var isHasErr1;
var isHasErr2 = false;
var isHasErr3;
var isHasErr4;
var tel;

$(function () {
	document.oncontextmenu = function () { return false; };
	//禁用开发者工具F12
	document.onkeydown = function () {
	if (window.event && window.event.keyCode == 123) {
	event.keyCode = 0;
	event.returnValue = false;
	return false;
	}
	};
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (isiOS) {
		$('.success').addClass('successios');
	} else {
		$('.success').removeClass('successios');
	}
	var r;
	if (window.location.search.indexOf("&") == '-1') {
		var r = window.location.search.substring(window.location.search.indexOf("?") + 1, window.location.search.length);
	} else {
		var r = window.location.search.substring(window.location.search.indexOf("?") + 1, window.location.search.indexOf("&"));
	}

	$.ajax({
		type: "post",
		dataType: "json",
		url: serverUrl + "uvCount",
		contentType: 'application/json',
		data: JSON.stringify({
			cmd: 'uvCount',
			token: '',
			version: '1.0',
			params: {
				"channel": r
			}
		}),
		success: function (json) {
			var resultNote = json.resultNote;
			if(resultNote == "当前渠道不存在！") {
				var a = document.getElementById("bgColor");
					a.style.display = "none";
			}
		}
	})


	//注册申请
	$(".applicationBtn").click(function () {
		checkTxt4();
		checkTxt1(".telTxt");
		// checkTxt2(".passwordTxt");
		checkTxt3(".codeTxt");


		if (isHasErr1 == false && isHasErr2 == false && isHasErr3 == false && isHasErr4 == false) {
			// var isStudent = $("input:radio[name=sex]:checked").attr("value");
			var telNumber = $(".telTxt").val();
			// var password = $(".passwordTxt").val();
			var code = $(".codeTxt").val();

			$.ajax({
				type: "Post",
				url: serverUrl + "register",
				dataType: "json",
				contentType: 'application/json',
				data: JSON.stringify({
					cmd: 'register',
					token: '',
					version: '1.0',
					params: {
						"mobile": telNumber,
						"validCode": code,
						"channel": r
					}
				}),
				success: function (json) {

					var result = eval(json);
					if (json.result == 1) {
						popup(json.resultNote)
						download()
					}
					if (json.result == 0) {
						// popup2("", json.resultNote, "知道了", "立即下载");
						$(".telTxt").val("");
						$(".passwordTxt").val("");
						$(".codeTxt").val("");
						download()
					}

				}
				
			})
		} else {
			return;
		}

	})
});

function checkTxt4() {
	if (!$('#agree').is(':checked')) {
		isHasErr4 = true
		popup("协议未同意")
	} else {
		isHasErr4 = false
	}
}

function checkTxt1(txtObj) {
	tel = false;
	// 文本框是否出现错误
	isHasErr1 = false;
	var textStr = $(txtObj).val();
	var getErrMsg = function () {
		if ($.trim(textStr) == "") {
			tel = true;
			isHasErr1 = true;
			popup("手机号不正确")
		} else {
			tel = false;
		}
		if ($.trim(textStr).length < parseInt($(txtObj).attr("minLen"))) {
			isHasErr1 = true;
			tel = true;
			popup("手机号不正确")
		} else {
			tel = false;
		}
		if (!util.string.validate(textStr, $(txtObj).attr("validate"))) {
			isHasErr1 = true;
			tel = true;
			popup("手机号不正确")
		} else {
			tel = false;
		}
	}
	if (tel == false) {}
	var errMsg = getErrMsg();
	// 如果出现错误显示错误提示动画,否则隐藏错误提示
	return isHasErr1 ? showErrTip(txtObj, errMsg) : hideErrTip(txtObj);
}

function checkTxt2(txtObj) {
	// 文本框是否出现错误
	isHasErr2 = false;
	var textStr = $(txtObj).val();
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
	var getErrMsg = function () {
		if ($.trim(textStr) == "") {
			isHasErr2 = true;
			popup("请输8-20位的数字和字母")
		}
		if ($.trim(textStr).length < parseInt($(txtObj).attr("minLen"))) {
			isHasErr2 = true;
			popup("请输8-20位的数字和字母")
		}
		if (!reg.test($.trim(textStr))) {
			isHasErr2 = true;
			popup("请输8-20位的数字和字母")
		}
	}
	var errMsg = getErrMsg();
	// 如果出现错误显示错误提示动画,否则隐藏错误提示
	return isHasErr2 ? showErrTip(txtObj, errMsg) : hideErrTip(txtObj);
}

function checkTxt3(txtObj) {
	// 文本框是否出现错误
	isHasErr3 = false;
	var textStr = $(txtObj).val();
	var getErrMsg = function () {
		if ($.trim(textStr) == "") {
			isHasErr3 = true;
			popup("请输6位的数字")
		}
		if ($.trim(textStr).length < parseInt($(txtObj).attr("minLen"))) {
			isHasErr3 = true;
			popup("请输6位的数字")
		}
		if (!util.string.validate(textStr, $(txtObj).attr("validate"))) {
			isHasErr3 = true;
			popup("请输6位的数字")
		}
	}
	var errMsg = getErrMsg();
	// 如果出现错误显示错误提示动画,否则隐藏错误提示
	return isHasErr3 ? showErrTip(txtObj, errMsg) : hideErrTip(txtObj);

}
//清除该文本框相关的所有错误提示样式
function removeErrStyle(txtObj) {}
//显示错误提示动画
function showErrTip(txtObj, errMsg) {}
// 隐藏错误提示
function hideErrTip(txtObj) {
	// 获取文本框后面红色的文字元素对象
	var errTipObj = $(txtObj).next();
	// 如果是IE10之前的版本
	if (util.isLTIE10()) {
		// 使用jquery的animate实现动画
		$(errTipObj).animate({
			opacity: '0',
			right: '0px'
		}, "fast");
	} else { // 其他浏览器使用CSS3特性实现动画
		// 去掉文本框后错误提示的红色样式
		$(errTipObj).removeClass("showErrTips");
	}
	// 返回0表示成功
	return 0;
}
//获取验证码倒计时	
function settime() {
	var city = window.location.search.substring(window.location.search.indexOf("?") + 1, window.location.search.length);
	// var city;
	// if (window.location.search.indexOf("&") == '-1') {
	// 	var city = window.location.search.substring(window.location.search.indexOf("?") + 1, window.location.search.length);
	// } else {
	// 	var city = window.location.search.substring(window.location.search.indexOf("?") + 1, window.location.search.indexOf("&"));
	// }
	var tel = $('.telTxt').val();
	if (!(/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(tel))) {
		popup('手机号不正确');
		return false;
	} else {
		$(".getCode").attr("disabled", "true");
		$.ajax({
			type: "POST",
			headers:{"Content-Type":"application/json;charset=UTF-8","Authorization":"token b18ef4d05d7f4ebe9cdac94b3b82336d"},
			url: serverUrl + "sendSms",
			dataType: "json",
			contentType: 'application/json',
			xhrFields: {
				withCredentials: true
			},
			data: JSON.stringify({
				cmd: 'sendSms',
				token: '',
				version: '1.0',
				params: {
					"mobile": tel,
					"channel": city,
					"type": "register"
				}
			}),
			success: function (json) {
				if(json.resultNote == "用户已注册，请下载APP登录！") {
					download();
				}
				if (json.result == 1 ) {
					popup(json.resultNote);
					countdown = 0;
	
				}
				// if (json.result == 0) {
				// 	popup2("", json.resultNote, "知道了", "立即下载");
				// 	// $(".errContent").text(json.resultNote);
				// 	// $(".failed").removeClass("hide");
				// 	countdown = 0;
				// }
			}
		});

		reduce();

		function reduce() {
			if (countdown == 0) {
				$(".getCode").attr("disabled", false);
				$(".getCode").text("获取短信验证码");
				countdown = 60;
				checkTxt1(".telTxt");
				return;
			} else {
				$(".getCode").text("重新发送      (" + countdown + ")");
				countdown--;
			}
			setTimeout(function () {
				reduce();
			}, 1000);
		}
	}

}