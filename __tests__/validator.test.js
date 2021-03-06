import { test, expect } from '@jest/globals';

import Validator from '../src/validator.js';

test('Validation string without rules', () => {
  const v = new Validator().string();

  expect(v.isValid()).toBe(true);
  expect(v.isValid('')).toBe(true);
  expect(v.isValid('text')).toBe(true);
});

test('String validation', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBe(true);
  expect(schema.minLength(3).isValid('text')).toBe(true);

  schema.required();

  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('hexlet')).toBe(true);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid('')).toBe(false);

  expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);

  expect(schema.isValid('what does the fox say')).toBe(false);
});

test('Number validation', () => {
  const v = new Validator();
  const schema = v.number();

  schema.required();
  expect(schema.isValid(10)).toBe(true);

  schema.positive();
  expect(schema.isValid(-2)).toBe(false);
  expect(schema.isValid(2)).toBe(true);

  schema.range(-5, 5);
  expect(schema.isValid(2)).toBe(true);
  expect(schema.isValid(-3)).toBe(false);
});

test('Array validation', () => {
  const v = new Validator();
  const schema = v.array();

  schema.required();
  expect(schema.isValid([])).toBe(true);
  expect(schema.isValid([1, 2, 3])).toBe(true);
  expect(schema.isValid(new Array(1))).toBe(true);

  expect(schema.isValid()).toBe(false);
  expect(schema.isValid('array')).toBe(false);
  expect(schema.isValid(null)).toBe(false);

  schema.sizeof(2);

  expect(schema.isValid([])).toBe(false);
  expect(schema.isValid(['text'])).toBe(false);
  expect(schema.isValid(['text', 'anotherText'])).toBe(true);
});

test('Nested object validation', () => {
  const v = new Validator();
  const schema = v.object();

  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true);
  expect(schema.isValid({ name: 'maya', age: null })).toBe(true);
  expect(schema.isValid({ name: '', age: null })).toBe(false);
  expect(schema.isValid({ name: 'ada', age: -5 })).toBe(false);
});

test('Adding new validators', () => {
  const v = new Validator();

  const fn = (value, start) => value.startsWith(start);
  v.addValidator('string', 'startWith', fn);

  const schema = v.string().test('startWith', 'H');
  expect(schema.isValid('exlet')).toBe(false);
  expect(schema.isValid('Hexlet')).toBe(true);

  const isPrime = (num) => {
    for (let i = 2; i < num; i += 1) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  v.addValidator('number', 'isPrime', isPrime);
  const schema2 = v.number().test('isPrime');
  expect(schema2.isValid(10)).toBe(false);
  expect(schema2.isValid(13)).toBe(true);
});
