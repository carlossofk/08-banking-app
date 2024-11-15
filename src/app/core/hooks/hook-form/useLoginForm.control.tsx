import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginValidator } from '@core/forms-validator/login-validator';
import { LoginFormType } from '@core/interfaces/validators-type/login';

export const useLoginFormControl = () => {
  return useForm<LoginFormType>({
    resolver: yupResolver(loginValidator),
    defaultValues: {
      user: '',
      password: '',
    }
  });
};