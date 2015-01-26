var test = require('tape').test;
var Tree = require('../../tree/Tree');

var x = { value: 'x' };

test('Tree.empty', function(t) {
	t.equal(void 0, Tree.empty().flatten().head());
	t.end();
});

test('Tree.isEmpty', function(t) {
	t.ok(Tree.empty().isEmpty());
	t.notOk(Tree.of(x).isEmpty());
	t.end();
});

test('Tree.of', function(t) {
	t.equal(x, Tree.of(x).flatten().head());
	t.ok(x, Tree.of(x).flatten().tail().isEmpty());
	t.end();
});