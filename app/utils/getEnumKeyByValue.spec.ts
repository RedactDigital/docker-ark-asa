import { expect, test } from 'bun:test';
import getEnumKeyByValueUtils from 'utils/getEnumKeyByValue.utils.ts';

test('getEnumKeyByValue', () => {
  enum TestEnum {
    A = 'a',
    B = '1',
  }

  expect(getEnumKeyByValueUtils(TestEnum, 'a')).toBe('A');
  expect(getEnumKeyByValueUtils(TestEnum, '1')).toBe('B');
});
