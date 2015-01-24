# Pure data structures

This is an experiment with purely function, immutable data structures.  I wanted to explore ways to apply functional programming and immutability patterns in JavaScript, since that's the language I use in my day job.

My plan is to pick a range of data structures and draw inspiration from Okasaki "Purely Functional Data Structures", as well as Haskell and Clojure core data structures.  I'll implement each minimally, but at least to a point that I feel shows the core concepts of the particular structure.  Some data structures, such as lists, serve as the basis for implementing others, and so may need a more complete implementation.

## Data Structures

All data structures are immutable: any operation that would mutate the data structure (eg `Array.prototype.push`) returns a new structure instead, leaving the original intact.

### Warm up

#### List

A cons cell-based list.  It also includes a O(1) optimization for concatenating two lists.

#### Queue

A FIFO queue built from two [List](#list)s.

#### BinaryHeap

An ordered heap, built as a binary tree

#### Tree (rose tree, aka multi-way tree)

A tree in which each node has a value and zero or more child nodes, built atop [List](#list).

## Caveats

Purely functional data structures are typically highly recursive.  Building them in an environment that lacks proper tail calls and [tail recursion modulo cons](http://en.wikipedia.org/wiki/Tail_call#Tail_recursion_modulo_cons) can result in stack overflows.  The only JavaScript environment I know of that supports proper tail calls is [continuum](https://github.com/Benvie/continuum), and no environments support tail recursion modulo cons.  Consequently, many of the data structures here will fail spectacularly and unpredictably by overflowing the call stack.