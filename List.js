/** @license MIT License (c) copyright 2015 original author or authors */
/** @author Brian Cavalier */

var iterator = require('./iterator');

module.exports = List;

var EMPTY;

// List
function List(head, tail) {
	this._head = head;
	this._tail = tail;
}

List.empty = function() {
	return EMPTY;
};

List.of = function(x) {
	return EMPTY.cons(x);
};

List.prototype.cons = function(x) {
	return new List(x, this);
};

List.prototype.head = function() {
	return this._head;
};

List.prototype.tail = function() {
	return this._tail;
};

List.prototype.isEmpty = function() {
	return this === EMPTY;
};

List.prototype.reverse = function() {
	return reverse(this, EMPTY);
};

List.prototype.concat = function(l2) {
	return concat(this, l2);
};

List.prototype.foldl = function(f, z) {
	return this.isEmpty() ? z
		 : this.tail().foldl(f, f(z, this.head()));
};

List.prototype.foldr = function(f, z) {
	return this.isEmpty() ? z
		 : f(this.tail().foldr(f, z), this.head());
};

List.prototype.toString = function() {
	return toString(this);
};

// ES iterator
List.prototype[iterator.key] = function() {
	return new ListIterator(this);
};

// The empty list
EMPTY = new List(void 0, void 0);
EMPTY._tail = EMPTY;

// List with O(1) list concatenation. In essence,
// a binary tree of lists
function ConcatList(left, right) {
	this.left = left;
	this.right = right;
}

ConcatList.prototype.cons = function(x) {
	return new List(x, this);
};

ConcatList.prototype.head = function() {
	return this.left.isEmpty() ? this.right.head() : this.left.head();
};

ConcatList.prototype.tail = function() {
	return this.left.tail().isEmpty() ? this.right
		 : new ConcatList(this.left.tail(), this.right);
};

ConcatList.prototype.isEmpty = function() {
	return this.left.isEmpty() && this.right.isEmpty();
};

ConcatList.prototype.reverse = function() {
	return new ConcatList(this.right.reverse(), this.left.reverse());
};

ConcatList.prototype.concat = function(l2) {
	return concat(this, l2);
};

ConcatList.prototype.foldl = function(f, z) {
	return this.right.foldl(f, this.left.foldl(f, z));
};

ConcatList.prototype.foldr = function(f, z) {
	return this.left.foldr(f, this.right.foldr(f, z));
};

ConcatList.prototype.toString = function() {
	return toString(this);
};

ConcatList.prototype[iterator.key] = function() {
	return new ListIterator(this);
};

// Reverse a list
function reverse(l, r) {
	return l === EMPTY ? r
		: reverse(l.tail(), r.cons(l.head()))
}

// Concat 2 lists. Returns a ConcatList as an optimization
function concat(l1, l2) {
	return l1.isEmpty() ? l2
		 : l2.isEmpty() ? l1
		 : new ConcatList(l1, l2);
}

function toString(list) {
	return list.isEmpty() ? '[]'
		: '[' + list.tail().foldl(appendStringItem, ''+list.head()) + ']';
}

function appendStringItem(s, x) {
	return s + ',' + x;
}

function ListIterator(list) {
	this.list = list;
}

ListIterator.prototype.next = function() {
	if(this.list.isEmpty()) {
		return { done: true, value: void 0 };
	}

	var list = this.list;
	this.list = list.tail();
	return { done: false, value: list.head() };
};
