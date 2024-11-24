import { AxiosError } from 'axios';
import { handleTryCatch } from '@core-utils/handle-try-catch';

describe('handleTryCatch', () => {

  test('Should return result when promise is resolved successfully', async () => {
    const promise = async () => 'success';

    const [ result, error ] = await handleTryCatch(promise);

    expect(result).toBe('success');
    expect(error).toBeUndefined();
  });


  test('Should return AxiosError message when an AxiosError is thrown', async () => {
    const axiosError = new AxiosError('Request failed', 'GET', undefined, undefined, {
      status: 400,
      data: { message: 'Something went wrong' },
      statusText: 'Bad Request',
      headers: {},
      config: {} as never,
    });

    const promise = async () => { throw axiosError; };

    const [ result, error ] = await handleTryCatch(promise);

    expect(result).toBeUndefined();
    expect(error).toBeDefined();
    expect(error?.message).toBe('Something went wrong');
  });


  test('Should return a general error when a non-Axios error is thrown', async () => {
    
    const error = new Error('Something went wrong');
    const promise = async () => {
      throw error;
    };

    const [ result, errorReturned ] = await handleTryCatch(promise);

    expect(result).toBeUndefined();
    expect(errorReturned).toBeDefined();
    expect(errorReturned).toBe(error);
  });


  test('Should handle function that returns a value (not a promise)', async () => {
    const func = () => 'direct result';

    const [ result, error ] = await handleTryCatch(func);

    expect(result).toBe('direct result');
    expect(error).toBeUndefined();
  });


  test('should not return an error when a non-promise/non-function value is passed', async () => {
    const invalidInput = 'not a promise or function';

    const [ result, error ] = await handleTryCatch(invalidInput as never);

    expect(result).toBeDefined();
    expect(error).toBeUndefined();
  });

});
