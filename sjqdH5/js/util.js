//工具类
var util = {
	/**
	 * cookie处理工具类
	 */
	cookie : {
		/**
		 * 创建cookie
		 * 
		 * @param：{String} name 名称
		 * @param：{String} value 值
		 * @return：{Null}
		 */
		set : function(name, value) {
			var Days = 7;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		/**
		 * 获取cookie
		 * 
		 * @param：{String} name 名称
		 * @return：{String} 返回该名称对应的值
		 */
		get : function(name) {
			var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (arr != null)
				return unescape(arr[2]);
			return null;
		},
		/**
		 * 删除cookie
		 * 
		 * @param：{String} name 名称
		 * @return：{Null}
		 */
		del : function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.get(name);
			if (cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	},
	// 字符串处理
	string : {
		/**
		 * 全文替换
		 * 
		 * @param: {String} s1 在s1中把s2替换为s3
		 * @param: {String} s2 搜索s2
		 * @param: {String} s3 替换为s3
		 * @return: {String} 替换后的文字
		 */
		replaceAll : function(s1, s2, s3) {
			return (s1 + "").replace(new RegExp(s2, "gm"), s3);
		},
		/**
		 * 字符串验证
		 * 
		 * @param str
		 *            {String} 用于验证的字符串
		 * @param type
		 *            {String} 验证类型可以自由组合，可传入nc
		 * @return: {Boolean} 仅包含指定的字符串类型返回true，如果包含了其他类型返回false
		 */
		validate : function(str, type) {
			var reg = "";
			// 规则
			var rules = {
				c : "\\u4E00-\\u9Fa5",
				e : "A-Za-z",
				n : "0-9",
				m : "\\-",
				_ : "\\_",
				a : "，。."
			};
			// 参数检查：如果传入的两个参数为空或为null直接验证不通过
			if (str == "" || str == null || type == "" || type == null)
				return false;
			// 遍历规则对象，把根据传入的要求拼接正则表达式，如传入e就会拼接上"A-Za-z"，如传入en就拼接出A-Za-z0-9
			for ( var rule in rules) {
				// 如果当前的规则在传入的type字符串中能找到
				if (type.indexOf(rule) > -1) {
					// 把规则对应的正则部分拼接起来
					reg += rules[rule];
				}
			}
			// 创建正则表达式
			var regExp = new RegExp(eval("/^[" + reg + "]*$/"));
			// 返回正则的验证结果
			return regExp.test(str);
		}
	},
	//获取get方式传递到页面的参数
	getQueryString : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURI(r[2]);//转码
		return null;
	},
	//判断当前浏览器是否是IE7~IE9，因为这些浏览器不支持CSS动画
	isLTIE10 : function(){
		return $.browser.msie && $.browser.version != "10.0";
	}
};
