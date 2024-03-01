import { jest } from '@jest/globals';
import { sum } from '../../src/sum.js';

// this is from jest docs for ESM usage;
// jest.unstable_mockModule('node:child_process', () => ({
//   execSync: jest.fn(),
//   // etc.
// }));

// const { execSync } = await import('node:child_process');

// notion! the tests below are only for joy
const sumObj = {
  sumAB: (a, b) => {
    return a + b;
  },
};

const spyFf = jest.spyOn(sumObj, `sumAB`);

const mockFf = jest
  .fn()
  .mockReturnValue(42)
  .mockReturnValueOnce(9)
  .mockImplementationOnce((num) => Math.pow(num, 4));

function asyncTest() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(42), 3000);
  });
}

it.todo(`implement NaN / b`);

describe(`test case basic`, () => {
  it(`test basic sum of numbers`, () => {
    expect(9 + 16).toBe(25);
  });
});

describe.each([
  { a: 1, b: 5, expected: 6 },
  { a: 7, b: -5, expected: 2 },
  { a: 9, b: 16845, expected: 16854 },
])(`test sum function`, ({ a, b, expected }) => {
  it(`${a} + ${b} = ${expected}`, () => {
    expect(sum(a, b)).toBe(expected);
  });
});

describe(`test jest.spyOn(func, method)`, () => {
  it(`test spyFf(7, 9) was called with args(7, 9)`, () => {
    spyFf(7, 9);
    expect(spyFf).toHaveBeenCalledWith(7, 9);
    expect(spyFf).toHaveBeenCalledTimes(1);
  });

  it(`test spyFf(7, 9) => 16`, () => {
    expect(spyFf(7, 9)).toBe(16);
    expect(spyFf).toHaveBeenCalledTimes(1);
  });
});

describe(`test asynchronous function`, () => {
  it(`should return 42 after 3s `, () => {
    return expect(asyncTest()).resolves.toBe(42);
  });
});

describe(`test mockFf (jest.fn())`, () => {
  it(`return value once: 9`, () => {
    expect(mockFf()).toBe(9);
  });

  it(`implementation: 2 ** 4 === 16`, () => {
    expect(mockFf(2)).toBe(2 ** 4);
  });

  it(`return value: 42`, () => {
    expect(mockFf()).toBe(42);
  });
});
