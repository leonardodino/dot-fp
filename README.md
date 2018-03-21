# dot-fp

[![npm version](https://badge.fury.io/js/dot-fp.svg)](https://www.npmjs.com/package/dot-fp)
[![Build Status](https://travis-ci.org/leonardodino/dot-fp.svg)](https://travis-ci.org/leonardodino/dot-fp)
[![Test Coverage](https://codecov.io/gh/leonardodino/dot-fp/branch/master/graph/badge.svg)](https://codecov.io/gh/leonardodino/dot-fp)

Curried version of dot-prop-immutable.

## Installation

```shell
$ npm install dot-fp
```

**or**

```shell
$ yarn add dot-fp
```

## Description

The motivation for this module is to have a simple utility for changing state in a React-Redux application without mutating the existing state of plain JavaScript objects.

None of the functions mutate the input object. For efficiency, the returned object is not a deep clone of the original, but a shallow copy of the objects in the mutated path.


## Usage

```javascript
var dot = require('dot-fp');
var state = { todos: [] }, index = 0;

// Add todo:
state = dot.set(state)('todos')(list => [...list, {text: 'cleanup', complete: false}])
// or with destructuring assignment
state = {...state, todos: [...state.todos, {text: 'cleanup', complete: false}]};
//=>  { todos: [{text: 'cleanup', complete: false}] }

// Complete todo:
state = dot.set(state)(`todos.${index}.complete`)(true)
// or with destructuring assignment
state = {...state, todos: [
	...state.todos.slice(0, index),
	{...state.todos[index], complete: true},
	...state.todos.slice(index + 1)
]};
//=>  { todos: [{text: 'cleanup', complete: true}] }

// Delete todo:
state = dot.delete(state)(`todos.${index}`)
// or with destructuring assignment
state = {...state, todos: [
	...state.todos.slice(0, index),
	...state.todos.slice(index + 1)
]};
//=>  { todos: [] }
```
### get

Access a nested property by a dot path

```javascript
// Getter
dot.get({foo: {bar: 'unicorn'}})('foo.bar')
//=> 'unicorn'

dot.get({foo: {bar: 'a'}})('foo.notDefined.deep')
//=> undefined

dot.get({foo: {'dot.dot': 'unicorn'}})('foo.dot\\.dot')
//=> 'unicorn'
```


or use a property array as a path.

```javascript
// Use an array as get path
dot.get({foo: {'dot.dot': 'unicorn'}})(['foo', 'dot.dot'])
//=> 'unicorn'
```


It is also possible to index into an array where the special index `$end` refers to the last element of the array.

```javascript
var obj = {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']};

// Index into array
dot.get(obj)('foo.1')
//=> 'white-unicorn'

dot.get(obj)('foo.0.bar')
//=> 'gold-unicorn'

// Index into array with $end
dot.get(obj)('foo.$end')
//=> 'silver-unicorn'

// If obj is an array
dot.get([{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn'])('0.bar')
//=> 'gold-unicorn'

```


### set

Modify a nested property by a dot path

```javascript
// Setter
var obj = {foo: {bar: 'a'}};

var obj1 = dot.set(obj)('foo.bar')('b');
//obj1 => {foo: {bar: 'b'}}

var obj2 = dot.set(obj1 )('foo.baz')('x');
//obj2 => {foo: {bar: 'b', baz: 'x'}}
```

where `obj`, `obj1`, `obj2`, `obj3` all are different objects.



Use a function to modify the selected property, where first argument is the old value.

```javascript
// Setter where value is a function (get and set current value)
dot.set({foo: {bar: 'a'}})('foo.bar')(v => v + 'bc')
//=> {foo: {bar: 'abc'}}
```


Modify a nested array

```javascript
var obj = {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']};

// Index into array
dot.set(obj)('foo.1')('platin-unicorn')
//=> {foo: [{bar: 'gold-unicorn'}, 'platin-unicorn', 'silver-unicorn']}

dot.set(obj)('foo.0.bar')('platin-unicorn')
//=> {foo: [{bar: 'platin-unicorn'}, 'white-unicorn', 'silver-unicorn']}

// Index into array with $end
dot.set(obj)('foo.$end')('platin-unicorn')
//=> {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'platin-unicorn']}

```


### delete

Delete a nested property/array by a dot path

```javascript
var obj = {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']};

// delete
dot.delete(obj)('foo.$end');
//=> {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn']}

dot.delete(obj)('foo.0.bar');
//=> {foo: [{}, 'white-unicorn', 'silver-unicorn']}
```

### toggle

Toggle a boolean a value by a dot path.

```javascript
var obj = {foo: { bar: true } };

// toggle
dot.toggle(obj)('foo.bar');
//=> {foo: { bar: false } }
```
### merge

Merge a value by a dot path.
> The target value must be an object, array, null, or undefined.

 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.

```javascript
var obj = {foo: { bar: {a:1, b:2 } };

// merge object
dot.merge(obj)('foo.bar')({c:3});
//=> {foo: { bar:{ a:1, b:2, c:3} } }

var arr = {foo: { bar: [1, 2] } };

// merge array
dot.merge(arr)('foo.bar')([3, 4]);
//=> {foo: { bar:[1, 2, 3, 4 ] }
```

## License

[MIT](https://opensource.org/licenses/MIT)
