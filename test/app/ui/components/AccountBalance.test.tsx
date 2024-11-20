import { formatCurrency } from '@core-utils/format';
import { render } from '@testing-library/react';
import { AccountBalance } from '@ui/components/AccountBalance';

describe('<AccountBalance />', () => {

  // ==> Initial States
  const bankAccountsInitialState = {
    bankAccounts: [
      {
        id: 1,
        amount: 100, 
        customerId: 1, 
        number: 23123123
      } 
    ]
  };

  test('Should render the account number', () => {
    const { getByText } = render( 
      <AccountBalance bankAccounts={bankAccountsInitialState.bankAccounts} /> 
    );
    const accountNumber = bankAccountsInitialState.bankAccounts[0].number;
    expect( getByText(`${accountNumber}`) ).toBeTruthy();
    
  }); 
  
  test('Should render the account balance', () => {
    const { getByText } = render( 
      <AccountBalance bankAccounts={bankAccountsInitialState.bankAccounts} /> 
    );

    const balance = formatCurrency(bankAccountsInitialState.bankAccounts[0].amount);
    expect( getByText(balance) ).toBeTruthy();
  });

  test('Should render the account balance with a negative amount', () => {
    const { getByText } = render( 
      <AccountBalance bankAccounts={[ { id: 1, amount: -100, customerId: 1, number: 23123123 } ]} /> 
    );

    const balance = formatCurrency(-100);
    expect( getByText(balance) ).toBeTruthy();
  });
  
  test('Should render the account balance with a zero amount', () => {
    const { getByText } = render( 
      <AccountBalance bankAccounts={[ { id: 1, amount: 0, customerId: 1, number: 23123123 } ]} /> 
    );

    const balance = formatCurrency(0);
    expect( getByText(balance) ).toBeTruthy();
  });
});