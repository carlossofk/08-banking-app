import { act } from 'react';
import{ vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { WithdrawalForm } from '@ui/forms/WithdrawalForm';

import { renderWithReactHookForm } from 'test/mocked-functions/render-with-react-hook-form';

describe('<Withdrawal />', () => {

  test('Renders the form with all elements', () => {
    renderWithReactHookForm(
      <WithdrawalForm
        handleSubmitForm={vi.fn()}
        loadingSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          amount: 0,
        }
      }
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Withdraw' })).toBeInTheDocument();   
  });


  test('Calls handleSubmitForm with amount on form submit', async() => {
    const handleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <WithdrawalForm 
        handleSubmitForm={handleSubmitForm}  
        loadingSubmit={false} 
      />
    );
    
    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' });
    act(() =>{
      fireEvent.change(amountInput, { target: { value: 100 } });
      fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));
    });

    await waitFor(() => expect(handleSubmitForm).toHaveBeenCalled() );
  });


  test('Displays validation errors when present', async() => {
    const handleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <WithdrawalForm
        handleSubmitForm={handleSubmitForm}
        loadingSubmit={false} />,
      {
        toPassBack: [ ],
        defaultValues: {
          amount: 0,
        }
      }
    );

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' });
    const submitButton = screen.getByRole('button', { name: 'Withdraw' });

    act(() => fireEvent.click(submitButton));
    await waitFor(() => expect(screen.queryByText('Amount is required')).toBeInTheDocument() );
    
    act(() => {
      fireEvent.change(amountInput, { target: { value: -100 } });
      fireEvent.click(submitButton);
    });
    await waitFor(() =>  {
      expect(screen.queryByText('Amount must be greater than 0')).toBeInTheDocument();
      expect(handleSubmitForm).not.toHaveBeenCalled();
    });
  });


  test('Disables the submit button when loadingSubmit is true', async() => {
    const handleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <WithdrawalForm
        handleSubmitForm={handleSubmitForm}
        loadingSubmit={true} />,
      {
        toPassBack: [ ],
        defaultValues: {
          amount: 0,
        }
      }
    );
    const submitButton = screen.getByRole('button', { name: 'Withdraw' });
    await waitFor(() => expect(submitButton).toBeDisabled() );
  });


  test('Resets the form when loadingSubmit is false', async ()=> {
    const handleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <WithdrawalForm
        handleSubmitForm={handleSubmitForm}
        loadingSubmit={false} />,
      {
        toPassBack: [ ],
        defaultValues: {
          amount: 0,
        }
      }
    );

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' }) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Withdraw' });
    act(() => {
      fireEvent.change(amountInput, { target: { value: 100 } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(handleSubmitForm).toHaveBeenCalled();
      expect(amountInput.value).toBe('');
    });
  });

});