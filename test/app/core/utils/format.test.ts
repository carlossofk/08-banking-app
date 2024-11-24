import { formatCurrency } from '@core-utils/format';

describe('Format', () => {

  test('Should format a number with 2 decimal places', () => {
    const number = 1000.555;
    const result = formatCurrency(number);

    expect(result).toBe('$ 1,000.55');
  });

  test('Should format a number with 0 decimal places', () => {
    const number = 1000;
    const result = formatCurrency(number);

    expect(result).toBe('$ 1,000.00');
  });

  test('Should format a number with 1 decimal place', () => {
    const number = 1000.5;
    const result = formatCurrency(number);

    expect(result).toBe('$ 1,000.50');
  });

  test('Should format a number with no decimal places', () => {
    const number = 1000;
    const result = formatCurrency(number);

    expect(result).toBe('$ 1,000.00');
  });

});