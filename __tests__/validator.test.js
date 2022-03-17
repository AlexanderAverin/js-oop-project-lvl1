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
