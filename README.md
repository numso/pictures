# Drawing Dynamic Visualizations

Based on [Drawing Dynamic Visualizations](http://vimeo.com/66085662) by Bret Victor.

Hosted at [pictures.dallinosmun.com](https://pictures.dallinosmun.com)

I've seen quite a few of Bret Victor's videos and they always blow me away. I want to explore and come up with my own creative tools. I've decided to recreate one of his tools to help me more fully grasp the concepts he explains. Right now I'm stuck in old programming paradigms and I need help to open up my mind. There's no better way to understand something than to create it yourself.

(todo:: screenshot goes here)

## Goals

- Have Fun.
- Gain better understanding of next-gen creation tools.
- Extract out library for storing/evaluating visual equations. (i.e. "(energy in KWh) / 1000" )
- Extract out library for dragging numbers to adjust them.

## To Hack On It

- Install node
- `yarn global add js.new` or `npm i -g js.new`
- `js.new`

## Todo

**The data section majorly needs a refactor and restyle. Wanna get "gui tags" and "draggable nums" done first.**

####Data

- [x] Setup basic styles and layout
- [x] Refactor layout styles to flexbox maybe?
- [x] Get basic elements in
- [x] Put IDs on data elements, reference all by id instead of by label
- [ ] Should IDs be wrapped in {} for easier regex / discovery / manipulation ?
- [x] Evaluate arrays and scalars in the same context
- [x] Use Regex to pull out any 'tagged items'
- [ ] Switch out `with(ctx)` for `fn.call(ctx)`. Put `use strict` back in
- [x] Create new evaluators for array items (see note below)
- [x] `Feature` Ability to change numbers by clicking and dragging them
- [x] `Feature` See tags as a GUI element in equation (viewing)
- [ ] `Feature` See tags as a GUI element in equation (editing)
- [x] `Feature` Ability to drag / drop tags into the equation
- [x] `Feature` Dropdown of Array Reductions (min, max, avg, etc)
- [x] `Feature` Use of Array Reductions in equations
- [ ] Better Styling (emphasis added above)
- [ ] `Feature` Ability to delete data elements
- [x] Better way to store data? It's a mess right now... (cursors)
- [ ] Revisit Usability when it's all done.

####Picture

- [ ] Bug: Draw shape from other shape, uses wrong coord system

##Evaluator Notes

Still need to think about:

- array min, max, avg, etc
- cacheing unchanged results

Steps

1.  Eval everything you can with just a plain old js eval
2.  Eval everything you can using previously eval'ed vars as context
3.  Recursively do step 2 until:
4.  You've eval'ed every var
5.  You're not making progress

###Contexts

```javascript
// Possible Input: {a-1} + {a-2} * {s-1} / 1000 + {a-3-max}
// regex out the vars: \{(.*)\}
var ctx = {};
_.each(regexVar, function () {
  ctx[regexVar] = // grab it out of some global registry
  // if it hasn't been eval'ed yet, skip this one and come back to it on the next iteration
  // also do a split and check for things like a-3-max, get a-3 out and run max on it to get val.
});
```

###Arrays

```javascript
var arr = []
for (var i = 0; i < maxLengthOfArrays; i++) {
  try {
    arr[i] = eval(getCodesAt(i))
  } catch (e) {}
}

function getCodesAt (i) {
  // Possible Input: {a-1} + {a-2} * {s-1} / 1000
  // Read as: array1 + array2 * scalar1 / 1000
  // convert this to `this.array1[${i}] + this.array2[${i}] * this.scalar1 / 1000`
}
```

###Scalars

```javascript
// forgot what I was gonna put here. Did I already cover it up there maybe?
// basically same as arrays, but without a loop
```
