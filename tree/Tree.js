/** @license MIT License (c) copyright 2015 original author or authors */
/** @author Brian Cavalier */

var List = require('../List');

module.exports = Tree;

var EMPTY;

// Rose Tree (aka Multi-way Tree)
function Tree(x, children) {
	this.value = x;
	this.children = children;
}

Tree.empty = function() {
	return EMPTY;
};

Tree.of = function(x) {
	return new Tree(x, EMPTY);
};

Tree.unfold = unfoldTree;

Tree.prototype.isEmpty = function() {
	return this === EMPTY;
};

Tree.prototype.map = function(f) {
	return this.isEmpty() ? this
		 : new Tree(f(this.value), this.children.map(f));
};

Tree.prototype.foldl = function(f, z) {
	return this.isEmpty() ? z
		 : this.children.foldl(foldlChild, f(z, this.value));

	function foldlChild(z, tree) {
		return tree.foldl(f, z);
	}
};

Tree.prototype.foldr = function(f, z) {
	return this.isEmpty() ? z
		 : this.children.foldr(foldlChild, f(z, this.value));

	function foldlChild(z, tree) {
		return tree.foldr(f, z);
	}
};

Tree.prototype.toString = function() {
	return this.value + forestToString('', this.children);
};

function unfoldTree(f, a) {
	var pair = f(a);
	return pair === void 0 ? EMPTY
		 : new Tree(pair[0], unfoldForest(f, pair[1]));
}

function unfoldForest(f, lista) {
	return lista.map(function(a) {
		return unfoldTree(f, a);
	});
}

function treeToString(depth, tree) {
	return depth + '|-' + tree.value + forestToString(depth + ' ', tree.children);
}

function forestToString(depth, forest) {
	return forest.foldl(function(s, t) {
		return s + '\n' + depth + treeToString(depth, t);
	}, '');
}

EMPTY = new Tree(void 0, List.empty());
