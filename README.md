# MultiBiMap 

> Bi-directional Multimap for nodejs

Allows you to map multiple keys and values with quick access whether searching by key or value. 


## Install

```
$ npm install --save multibimap
```

or 

```
yarn add multibimap
```

## Usage

### Initialisation

```js
import MultiBiMap from 'multibimap'

const map = new MultiBiMap();

OR 

const map = new MultiBiMap({
  iterableKey: false, // default
  iterableValue: false // default
});

```


### Literals vs Iterables

Args passed in are by default treated as literals. So if you pass an array in as a value, it will be stored against the key as an array. If you want the array to be treated as a set of items to be stored individually against the key, you can pass in `{iterableValue: true}`. If you pass it as a constructor option it will become the default behaviour for the map. You can also override it on individual calls to `add()`.

The same holds true in reverse for the `iterableKey` option.

### add(k, v)

```js
map.add('a', 'b');
// adds a->b

map.add('a', ['b', 'c'];
// adds a->['b', 'c']

map.add('a', ['b', 'c'], {iterableValue: true});
// adds a->b
// adds a->c

map.add(['a', 'b'], ['c', 'd'], {iterableKey: true});
// adds a->['c', 'd']
// adds b->['c', 'd']

map.add(['a', 'b'], ['c', 'd'], {iterableKey: true, iterableValue: true});
// adds a->c
// adds a->d
// adds b->c
// adds b->d
```

### has(k, v)

```js
map.add('a', 'b');

map.has('a', 'b');
// true

map.has('a', 'x');
// false

map.has('x', 'b');
// false
```

### hasKey(k)

```js
map.add('a', 'b');

map.has('a');
// true

map.has('b');
// false
```

### hasVal(v)

```js
map.add('a', 'b');

map.hasVal('b');
// true

map.hasVal('a');
// false
```

### getKey(k)

```js
map.add('a', 'b');
map.getKey('a');
// ['b']

map.add('a', 'c');

map.getKey('a');
// ['b', 'c']

map.getKey('x');
// false
```

### getVal(v)

```js
map.add('a', 'b');
map.getVal('b');
// ['a']

map.add('c', 'b');
map.getVal('b');
// ['a', 'c']

map.getVal('x');
// false
```


### delete(k, v)

```js
map.add('a', 'b');
map.add('a', 'c');
map.add('c', 'b');

map.delete('a', 'b');

map.has('a', 'b')
// false

map.hasKey('a');
// true

map.hasValue('b');
// true
```

### deleteKey(k)

```js
map.add('a', 'b');
map.add('a', 'c');
map.add('b', 'c');

map.deleteKey('a');

map.hasKey('a');
// false

map.hasVal('b');
// false

map.hasVal('c');
// true
```


### deleteVal(v)

```js
map.add('a', 'b');
map.add('a', 'c');
map.add('b', 'c');

map.deleteVal('c');

map.hasVal('c');
// false

map.hasKey('b');
// false

map.hasValue('a');
// true
```

## Testing

```
$ npm test
```

## Building

This project is written in es6 and uses babel to compile

```
$ npm build
```

## Environments

This has only been tested in node 6.10.0


## WARNINGS

### Efficiency

This has not been benchmarked, so I make no claims for efficiency. Feel free to have a go though and let me know.


### Unexpected Values

This has not been tested for unexpected key or value arguments. e.g. passing in `undefined`, `null`, `NaN` etc will likely give strange behaviour. The underlying code uses a mirrored pair of es6 `Map` objects, so the behaviour will be as expected with them.



## License

MIT © [Alastair Brayne](mailto:al@perchten.co.uk) All rights reserved.
