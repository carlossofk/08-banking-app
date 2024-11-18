import { useState } from 'react';
import { GrFormViewHide, GrView } from 'react-icons/gr';

import { IBankAccount } from '@core-interfaces/app/account';
import { formatCurrency } from '@core-utils/format';
import './style.scss';	

interface Props {
 bankAccounts: IBankAccount[];
}

export const AccountBalance = ({ bankAccounts }: Props) => {
  const [ hiddenBalances, setHiddenBalances ] = useState<boolean[]>(Array(bankAccounts?.length).fill(false));
  const toggleBalanceVisibility = (index: number) => {
    const updatedBalances = [ ...hiddenBalances ];
    updatedBalances[index] = !updatedBalances[index];
    setHiddenBalances(updatedBalances);
  };

  return (
    <section>
      {bankAccounts?.map((account, index) => (
        <article className="account-balance" key={account.id}> 
          <div className="account-balance__wrapper">
            <div className="account-balance__wrapper-text account-balance__wrapper-text--center">
              <h3 className='account-balance__account-title'>Account Number</h3>
              <p className='account-balance__account-number'>{account.number}</p>	
            </div>
            <div className="account-balance__wrapper-text">
              <div className='account-balance__wrapper-text--row'>
                <button
                  className="account-balance__toggle-button"
                  onClick={() => toggleBalanceVisibility(index)}
                  aria-label={hiddenBalances[index] ? 'Show Balance' : 'Hide Balance'}
                >
                  {hiddenBalances[index] 
                    ? <GrView /> 
                    :<GrFormViewHide />
                  }
                </button>
                <h3 className='account-balance__title'>Available Balance</h3>
              </div>
              <p className="account-balance__account-amount">
                {hiddenBalances[index]
                  ? '* *****'
                  : formatCurrency(account.amount)}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
