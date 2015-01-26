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