/** @license MIT License (c) copyright 2015 original author or authors */
/** @author Brian Cavalier */

module.exports = BinaryHeap;

var LEAF;

// A simple Binary Heap
// By default, items are ordered using < and >
// To use a different ordering, provide a compare function to heapOf()
function BinaryHeap(compare, x, rank, left, right) {
	// Unfortunate: Must explicitly accept an ordering/compare function
	this._compare = compare;
	this._value = x;
	this._rank = rank;
	this._left = left;
	this._right = right;
}

BinaryHeap.of = heapOf;
function heapOf(x, compare) {
	// Unfortunate: optional comparator function
	return new BinaryHeap(compare||defaultCompare, x, 1, LEAF, LEAF);
}

BinaryHeap.empty = function() {
	return LEAF;
};

BinaryHeap.prototype.isEmpty = function() {
	return this === LEAF;
};

BinaryHeap.prototype.rank = function() {
	return this._rank;
};

BinaryHeap.prototype.head = function() {
	return this._value;
};

BinaryHeap.prototype.tail = function() {
	return merge(this._compare, this._left, this._right);
};

BinaryHeap.prototype.insert = function(x) {
	return merge(this._compare, this, heapOf(x, this._compare));
};

BinaryHeap.prototype.merge = function(h) {
	return merge(this._compare, this, h);
};

function merge(compare, t1, t2) {
	return t1.isEmpty() ? t2
		 : t2.isEmpty() ? t1
		 : _merge(compare, t1, t2);
}

function _merge(compare, t1, t2) {
	var t1head = t1.head();
	var t1rank = t1.rank();
	var t2rank = t2.rank();
	var c = compare(t1head, t2.head());

	// This is certainly not "obviously correct" code
	// TODO: Find a cleaner, more obvious implementation
	if(c < 0 || (c === 0 && t1rank <= t2rank)) {
		var newRank = t1rank + t2rank;
		if(t1._left.rank() < t1._right.rank()) {
			return new BinaryHeap(compare, t1head, newRank, merge(compare, t1._left, t2), t1._right);
		} else {
			return new BinaryHeap(compare, t1head, newRank, t1._left, merge(compare, t1._right, t2));
		}
	}

	return _merge(compare, t2, t1);
}

LEAF = new BinaryHeap(defaultCompare, void 0, 0, void 0, void 0);
LEAF._left = LEAF._right = LEAF;

function defaultCompare(x, y) {
	return x < y ? -1
		 : x > y ? 1
		 : 0
}