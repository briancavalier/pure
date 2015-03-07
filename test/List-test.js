var test = require('tape').test;
var List = require('../List');

var x = { value: 'x' };

test('List.empty', function(t) {
	t.equal(void 0, List.empty().head());
	t.ok(List.empty().tail().isEmpty());
	t.end();
});

test('List.isEmpty', function(t) {
	t.ok(List.empty().isEmpty());
	t.notOk(List.of(x).isEmpty());
	t.end();
});

test('List.of', function(t) {
	t.equal(x, List.of(x).head());
	t.ok(x, List.of(x).tail().isEmpty());
	t.end();
});

test('List.zipWith', function(t) {
	var l1 = List.of('c').cons('b').cons('a');
	var l2 = List.of(999).cons(3).cons(2).cons(1);

	var actual = l1.zipWith(append, l2);
	var expected = List.of('c3').cons('b2').cons('a1');

	t.equal(expected.head(), actual.head());
	t.equal(expected.tail().head(), actual.tail().head());
	t.equal(expected.tail().tail().head(), actual.tail().tail().head());
	t.ok(actual.tail().tail().tail().isEmpty());
	t.end();
});

function append(a, b) {
	return a+b;
}