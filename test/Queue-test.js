var test = require('tape').test;
var Queue = require('../Queue');

var x = { value: 'x' };

test('Queue.empty', function(t) {
	t.equal(void 0, Queue.empty().head());
	t.ok(Queue.empty().tail().isEmpty());
	t.end();
});

test('Queue.isEmpty', function(t) {
	t.ok(Queue.empty().isEmpty());
	t.notOk(Queue.of(x).isEmpty());
	t.end();
});

test('Queue.of', function(t) {
	t.equal(x, Queue.of(x).head());
	t.ok(x, Queue.of(x).tail().isEmpty());
	t.end();
});