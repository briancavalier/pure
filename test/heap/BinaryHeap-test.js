var test = require('tape').test;
var BinaryHeap = require('../../heap/BinaryHeap');

var x = { value: 'x' };

test('BinaryHeap.empty', function(t) {
	t.equal(void 0, BinaryHeap.empty().head());
	t.equal(0, BinaryHeap.empty().rank());
	t.end();
});

test('BinaryHeap.isEmpty', function(t) {
	t.ok(BinaryHeap.empty().isEmpty());
	t.notOk(BinaryHeap.of(x).isEmpty());
	t.end();
});

test('BinaryHeap rank', function(t) {
	t.equal(0, BinaryHeap.empty().rank());
	t.equal(1, BinaryHeap.of(x).rank());
	t.equal(2, BinaryHeap.of(1).insert(2).rank());
	t.end();
});

test('BinaryHeap head', function(t) {
	t.equal(x, BinaryHeap.of(x).head());
	t.end();
});

test('BinaryHeap merge', function(t) {
	var h1 = BinaryHeap.of(1).merge(BinaryHeap.of(2));
	var h2 = BinaryHeap.of(2).merge(BinaryHeap.of(1));

	t.equal(1, h1.head());
	t.equal(h1.head(), h2.head());

	t.equal(2, h1.tail().head());
	t.equal(h1.tail().head(), h2.tail().head());

	t.end();
});

test('BinaryHeap insert', function(t) {
	t.equal(x, BinaryHeap.empty().insert(x).head());
	t.equal(1, BinaryHeap.empty().insert(2).insert(1).head());
	t.end();
});

test('BinaryHeap tail', function(t) {
	t.ok(BinaryHeap.empty().insert(2).tail().isEmpty());
	t.notOk(BinaryHeap.empty().insert(2).insert(1).tail().isEmpty());
	t.equal(2, BinaryHeap.empty().insert(2).insert(1).tail().head());
	t.end();
});



