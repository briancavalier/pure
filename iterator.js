/** @license MIT License (c) copyright 2015 original author or authors */
/** @author Brian Cavalier */

var KEY = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

exports.key = KEY;
exports.get = function(x) {
	return x[KEY]();
};