import { fireEvent, screen, waitFor } from '@testing-library/react';
import { DepositForm } from '@ui/forms/DepositForm';
import { act } from 'react';
import { renderWithReactHookForm } from 'test/mocked-functions/render-with-react-hook-form';

describe('<DepositForm />', () => {
  
  const mockeHandleSubmitForm = vi.fn();

  test('Renders the form with all elements', () => {
    renderWithReactHookForm(
      <DepositForm
        handleSubmitForm={vi.fn()}
        isLoadingSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          accountDestination: '',
          amount: '',
        }
      }
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Deposit Type' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Account Number' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Deposit' })).toBeInTheDocument();
  });


  test('Calls handleSubmitForm with account and amount on form submit', async () => {
    renderWithReactHookForm(
      <DepositForm
        handleSubmitForm={mockeHandleSubmitForm}
        isLoadingSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          accountDestination: '',
          amount: 0,
        }
      }
    );

    const accountInput = screen.getByRole('textbox', { name: 'Account Number' });
    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' });
    const submitButton = screen.getByRole('button', { name: 'Deposit' });

    act(() => {
      fireEvent.change(accountInput, { target: { value: '12345678' } });
      fireEvent.change(amountInput, { target: { value: 100 } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockeHandleSubmitForm).toHaveBeenCalled();
    });
  });


  test('Displays validation errors when present', async() => {
    renderWithReactHookForm(
      <DepositForm
        handleSubmitForm={mockeHandleSubmitForm}
        isLoadingSubmit={false} />,
      {
        toPassBack: [ 'setValue' ],
        defaultValues: {
          accountDestination: '',
          amount: 0,
        }
      }
    );

    
    const accountInput = screen.getByRole('textbox', { name: 'Account Number' });
    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' });
    const submitButton = screen.getByRole('button', { name: 'Deposit' });

    act(() => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.queryByText('Account number is required')).toBeInTheDocument();
      expect(screen.queryByText('Amount is required')).toBeInTheDocument();
    });
    
    act(() => {
      fireEvent.change(accountInput, { target: { value: '123' } });
      fireEvent.change(amountInput, { target: { value: -100 } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.queryByText('Account number must be at least 8 digits')).toBeInTheDocument();
      expect(screen.queryByText('Amount must be greater than 0')).toBeInTheDocument();
    });
  });

  
  test('Disables the submit button when loadingSubmit is true', ()=> {
    renderWithReactHookForm(
      <DepositForm
        handleSubmitForm={mockeHandleSubmitForm}
        isLoadingSubmit={true} />,
      {
        toPassBack: [],
        defaultValues: {
          accountDestination: '',
          amount: 0,
        }
      }
    );
    const submitButton = screen.getByRole('button', { name: 'Deposit' });
    expect(submitButton).toBeDisabled();
  });

});