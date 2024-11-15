import { object as objectYup, string } from 'yup';

export const loginValidator = objectYup({
  user: string().required(),
  password: string().required(),
});