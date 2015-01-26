/** @license MIT License (c) copyright 2015 original author or authors */
/** @author Brian Cavalier */

var List = require('./List');
var iterator = require('./iterator');

module.exports = Queue;

// Immutable Queue
// Based on Okasaki: http://www.cs.cmu.edu/~rwh/theses/okasaki.pdf
function Queue(front, frontLen, back, backLen) {
	this.front = front;
	this.frontLen = frontLen;
	this.back = back;
	this.backLen = backLen;
}

Queue.empty = function() {
	return new Queue(List.empty(), 0, List.empty(), 0);
};

Queue.of = function(x) {
	return new Queue(List.of(x), 1, List.empty(), 0);
};

Queue.prototype.isEmpty = function() {
	return this.size() === 0;
};

Queue.prototype.size = function() {
	return this.frontLen + this.backLen;
};

Queue.prototype.head = function() {
	return this.front.head();
};

Queue.prototype.tail = function() {
	return queue(this.front.tail(), this.frontLen - 1, this.back, this.backLen);
};

Queue.prototype.push = function(x) {
	return queue(this.front, this.frontLen, this.back.cons(x), this.backLen + 1);
};

Queue.prototype.toString = function() {
	return this.front.concat(this.back.reverse()).toString();
};

// Pseudo-constructor that manages front/back lists
function queue(front, frontLen, back, backLen) {
	return frontLen === 0 ? new Queue(back.reverse(), backLen, List.empty(), 0)
		: new Queue(front, frontLen, back, backLen);
}

