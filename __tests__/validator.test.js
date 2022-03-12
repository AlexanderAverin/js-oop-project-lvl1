import { test, expect } from '@jest/globals';

test('example', () => {
  expect((() => 1)()).toEqual(1);
});
