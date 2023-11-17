import { describe, expect, test } from 'bun:test';
import getEnumKeyByValueUtils from 'utils/getEnumKeyByValue.utils.ts';

describe('utils', () => {
  test('getEnumKeyByValue', () => {
    enum TestEnum {
      A = 'a',
      B = '1',
    }

    expect(getEnumKeyByValueUtils(TestEnum, 'a')).toBe('A');
    expect(getEnumKeyByValueUtils(TestEnum, '1')).toBe('B');
  });
});
