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
  expect(schema.isValid('')).toBe(false);

  schema.minLength(2);
  expect(schema.isValid('text')).toBe(true);
  expect(schema.isValid('')).toBe(false);

  schema.contains('a');
  expect(schema.isValid('text: a')).toBe(true);
});
