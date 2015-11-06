(function() {
	"use strict";

	angular
		.module("thinkmobiles")
		.filter("phone", phoneFilter);

	function phoneFilter() {
		return function (value) {
			if (value.length !== 10 || !/^\d+$/.test(value)) {
				return value;
			}
			var code, number;
			code = value.slice(0, 3);
			number = value.slice(3);
			number = number.slice(0, 3) + '-' + number.slice(3);
			return "(" + code + ") " + number;
		};
	}

})();