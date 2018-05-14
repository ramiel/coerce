# Coerce

[![CircleCI](https://circleci.com/gh/ramiel/coerce.svg?style=svg)](https://circleci.com/gh/ramiel/coerce)

Coerce is a functional library that let you transform an input value into a fixed type and run validations on it.

This library aims to be as lean as possible so the minimal amount of code is run. If, for example, a validation fails, all the other validation functions are not run. More on this later.

## Install

`npm install --save @ramielcreations/coerce`

## Transform into type - coercing

Usually when you receive a value from an http request, this value is a string. Your library expects a number and so you want to cast your data before using it. But casting values in javascript can lead to some weird situation. This may be one case where you want to use a coercer.

```js
const coerce = require('@ramielcreations/coerce');

const onError = () => new Error('Invalid value');
const myCoercer = coerce(onError);
const age = myCoercer(req.age).toInt().value();
```

As you can see we built a coercer passing a function to say what to do in case of error (in this case to return an error). Then we used the `toInt` method to ensure the age of the user is an integer. So, if the request contains the value `"25"` this is transformed to `25`, a number.

As you can see we built the coercer before using it. The signature of the `coerce` function is

`coerce :: Function -> a -> {value, validate}`

but any function in coerce is curried. In this case we took advantage of the currying and we wrote the call in two step, but this is equivalent

```js
const onError = () => new Error('Invalid value');
const age = coerce(onError, req.age).toInt().value();
```

## Validation

When you coerce a value, the library returns you an object with two methods: `value`, which return the casted value and `validate` which let you apply a series of validators.
A validator is simply a function that returns a boolean and some basic validators are provided.

```js
const coerce = require('@ramielcreations/coerce');
const lessThan = require('coerce/validators/numbers/lessThan');

const onError = () => new Error('Invalid value');
const myCoercer = coerce(onError);
const age = myCoercer(req.age)
  .toInt()
  .validate(
    lessThan(80),
    x => x > 18
  )
  .value();
```

In this case the value is validated and it's checked that it's minor then 80 and more than 18. A `moreThan` validator exists, but here the function is implemented to show you can use any function to validate

## Don't waste my time

The library uses internally a `Maybe` wrapper for the value, so no function is run if any of the previous fails

```js
const value = 100;
const angle = coerce(() => 0, value)
  .toFloat()
  .validate(
    multipleOf(90),
    x => {
      console.log('This is not called because the previous validation fails');
      return x > 20;
    }
  )
  .value();

// angle will be 0 and the second validation function won't be called
```
