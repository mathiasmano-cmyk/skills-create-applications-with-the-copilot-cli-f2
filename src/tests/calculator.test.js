// src/tests/calculator.test.js
const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../lib/calculator');

describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 4)).toBe(-4);
  });

  test('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
  });

  test('divides two numbers', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(-6, 2)).toBe(-3);
  });

  test('throws when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
  });

  describe('extended operations', () => {
    test('modulo 5 % 2 equals 1', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('modulo by zero throws', () => {
      expect(() => modulo(5, 0)).toThrow('Cannot modulo by zero');
    });

    test('power 2^3 equals 8', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('power with negative exponent', () => {
      expect(power(2, -1)).toBeCloseTo(0.5);
    });

    test('squareRoot of 16 equals 4', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('squareRoot of negative throws', () => {
      expect(() => squareRoot(-9)).toThrow('Cannot take square root of negative number');
    });
  });
});
