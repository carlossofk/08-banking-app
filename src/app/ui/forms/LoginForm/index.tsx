
import { InputText } from '@ui/components/FieldText';
import { LoginFormType } from '@core/interfaces/validators-type/login';
import { useLoginFormControl } from '@core-hooks/hook-form/useLoginForm.control';

import './styles.scss';
import { FaSpinner } from 'react-icons/fa';

interface Props{
  handlerLogin: (user: string, password: string) => void;
  loadSubmit: boolean;
}
export const LoginForm = ({ handlerLogin , loadSubmit }: Props) => {

  const { formState, control, handleSubmit } = useLoginFormControl();

  const onSubmit = (data:LoginFormType) => {
    handlerLogin(data.user, data.password);
  };

  return (
    <section className="login-form">
      <header className="login-form__header">
        <h1 className="header-login__title">
          Login
        </h1>
        <div className="header-login__container-logo">
          <img 
            className='header-login__logo'
            src="src/assets/logos/logo-transfer.svg"
            alt="Transfer Logo"
            aria-label="Transfer Logo" 
            aria-describedby="Transfer Logo" 
          />
          <h2 className='header-login__subtitle'>
            Transact
          </h2>
        </div>
      </header>

      <main className='login-form__main'>
        <form className='login-form__form'  onSubmit={handleSubmit(onSubmit)}>
          <fieldset className='login-form__fieldset'>
            <InputText 
              label="User"
              name="user"
              type="user"
              placeholder="User"
              control={control}
              error={formState?.errors?.user?.message}
            />

            <InputText 
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              control={control}
              error={formState?.errors?.password?.message}
            />
          </fieldset>

          <button 
            className='login-form__button'
            type="submit" 
            disabled={loadSubmit}
          >
            {loadSubmit && <FaSpinner className='login-form__spinner' /> }
            Login
          </button>
        </form>
      </main>
    </section>
  );
};
