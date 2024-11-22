import { act } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import PurchaseForm from '@ui/forms/PurchaseForm';

import { renderWithReactHookForm } from 'test/mocked-functions/render-with-react-hook-form';

describe('<PurchaseForm />', () => {

  test('Renders the form with all elements', () => {
    renderWithReactHookForm(
      <PurchaseForm
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
    expect(screen.getByRole('combobox', { name: 'Purchase Type' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Purchased' })).toBeInTheDocument();
  });


  test('Calls handleSubmitForm with amount on form submit', async() => {
    const mockedHandleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <PurchaseForm 
        handleSubmitForm={mockedHandleSubmitForm}
        loadingSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          amount: 0,
        }
      }
    );

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' });
    const submitButton = screen.getByRole('button', { name: 'Purchased' });

    act(() => fireEvent.click(submitButton));
    await waitFor(() => expect(mockedHandleSubmitForm).not.toHaveBeenCalled());

    act(() => {
      fireEvent.change(amountInput, { target: { value: 100 } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => expect(mockedHandleSubmitForm).toHaveBeenCalled());  
  });


  test('Displays validation errors when present', async() => {
    const mockedHandleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <PurchaseForm
        handleSubmitForm={mockedHandleSubmitForm}
        loadingSubmit={false} />,
      {
        toPassBack: [ ],
        defaultValues: {
          amount: 0,
        }
      }
    );

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' });
    const submitButton = screen.getByRole('button', { name: 'Purchased' });

    act(() => fireEvent.click(submitButton));
    await waitFor(() => expect(screen.queryByText('Amount is required')).toBeInTheDocument() );
    
    act(() => {
      fireEvent.change(amountInput, { target: { value: -100 } });
      fireEvent.click(submitButton);
    });
    await waitFor(() =>  {
      expect(screen.queryByText('Amount must be greater than 0')).toBeInTheDocument();
      expect(mockedHandleSubmitForm).not.toHaveBeenCalled();
    });

  });


  test('Disables the submit button when loadingSubmit is true', ()=> {
    renderWithReactHookForm(
      <PurchaseForm
        handleSubmitForm={vi.fn()}
        loadingSubmit={true} />,
      {
        toPassBack: [],
        defaultValues: {
          amount: 0,
        }
      }
    );
    const submitButton = screen.getByRole('button', { name: 'Purchased' });
    expect(submitButton).toBeDisabled();
  });

  test('Resets the form when loadingSubmit is false', async ()=> {
    const mockedHandleSubmitForm = vi.fn();
    renderWithReactHookForm(
      <PurchaseForm
        handleSubmitForm={mockedHandleSubmitForm}
        loadingSubmit={false} />,
      {
        toPassBack: [],
        defaultValues: {
          amount: 0,
        }
      }
    );

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount' }) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Purchased' });
    act(() => {
      fireEvent.change(amountInput, { target: { value: 100 } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(mockedHandleSubmitForm).toHaveBeenCalled();
      expect(amountInput.value).toBe('');
    });

  });

});