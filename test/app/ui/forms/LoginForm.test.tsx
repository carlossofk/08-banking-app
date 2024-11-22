import { test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '@ui/forms/LoginForm';
import { renderWithReactHookForm } from 'test/mocked-functions/render-with-react-hook-form';


describe('<LoginForm />', () => {
  
  const handlerLoginMocked = vi.fn();
  
  test('Renders the form with all elements', () => {
    renderWithReactHookForm(
      <LoginForm
        handlerLogin={handlerLoginMocked}
        loadSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          user: '',
          password: '',
        }
      }
    );

    expect(screen.getByRole('heading', { level:1 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Transfer Logo' })).toBeInTheDocument();
    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });


  test('Calls handlerLogin with user and password on form submit', async () => {
    renderWithReactHookForm(
      <LoginForm
        handlerLogin={handlerLoginMocked}
        loadSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          user: '',
          password: '',
        }
      }
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


  test('Disables the submit button when loadSubmit is true', () => {
    render(
      <LoginForm 
        handlerLogin={handlerLoginMocked}
        loadSubmit={true} 
      />
    );
  
    const submitButton = screen.getByRole('button', { name: 'Login' });
    expect(submitButton).toBeDisabled();
  });
  
  
  test('Displays validation errors when present', async() => {
    renderWithReactHookForm(
      <LoginForm
        handlerLogin={handlerLoginMocked}
        loadSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          user: '',
          password: '',
        }
      }
    );

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('user is a required field')).toBeInTheDocument();
      expect(screen.getByText('password is a required field')).toBeInTheDocument();
    });
  });
});