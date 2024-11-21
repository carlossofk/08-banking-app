import { test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { LoginForm } from '@ui/forms/LoginForm';

vi.mock('@core-hooks/hook-form/useLoginForm.control', () => ({
  useLoginFormControl: vi.fn().mockReturnValue({ 
    formState: { errors: {} },
    control: vi.fn(),
    handleSubmit: vi.fn(), 
    defaultValues: { user: '', password: '' },
  }),
}));

vi.mock('@ui/components/FieldText', () => {
  return {
    InputText: vi.fn(({ label, name, control }) => {
      return (
        <input
          aria-label={label}
          name={name}
          value={control.field?.value}
          ref={control.field?.ref}
          data-testid={name}
        />
      );
    }),
  };
});


describe('<LoginForm />', () => {
  
  const handlerLoginMocked = vi.fn();
  
  test('Renders the form with all elements', () => {
    render(
      <LoginForm 
        handlerLogin={handlerLoginMocked} 
        loadSubmit={false} 
      />
    );

    expect(screen.getByRole('heading', { level:1 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Transfer Logo' })).toBeInTheDocument();
    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });


  test('calls handlerLogin with user and password on form submit', async () => {
    const isLoadingMocked = false;
    render(
      <LoginForm 
        handlerLogin={handlerLoginMocked}
        loadSubmit={isLoadingMocked} 
      />
    );

    const userInput = screen.getByTestId('user') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(userInput,     { target: { value: 'testUser'     } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handlerLoginMocked).toHaveBeenCalled();
    });
  });
});