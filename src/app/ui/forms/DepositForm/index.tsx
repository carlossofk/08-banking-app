import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.scss';
import { DEPOSIT_TYPE } from '@core-constants/transaction';
import { FaSpinner } from 'react-icons/fa';
import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';
import { useModalShare } from '@core-hooks/hook-app/useModalShare';
import { MODAL_TYPE } from '@core-interfaces/app/modal-share';


interface FormValues {
  accountDestination: string;
  amount: number;
}

interface DepositFormProps {
  handleSubmitForm: (type: DEPOSIT_TYPE, data: { accountDestination: string; amount: number; }) => Promise<ITransactionMapperToApp | undefined>
  isLoadingSubmit: boolean;
}

export const DepositForm: React.FC<DepositFormProps> = ({ handleSubmitForm, isLoadingSubmit }) => {
  
  const { openShareModal, setDataShareModal } = useModalShare();
  const [ depositType, setDepositType ] = useState<DEPOSIT_TYPE>(DEPOSIT_TYPE.BRANCH);
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<FormValues>();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepositType(e.target.value as DEPOSIT_TYPE);
  };

  const submitHandler: SubmitHandler<FormValues> = async(data) => {
    const resp = await handleSubmitForm(depositType, { 
      accountDestination: data.accountDestination, 
      amount: data.amount,
    });

    setDataShareModal(MODAL_TYPE.MODAL_TRANSACTION, { 
      accountOrigin: resp?.accountOrigin,
      amountTransaction: resp?.amountTransaction,
      balance: resp?.balance,
      taxTransaction: resp?.taxTransaction,
      typeTransaction: resp?.typeTransaction
    });
    openShareModal(MODAL_TYPE.MODAL_TRANSACTION);
  };

  useEffect(() => {
    if(!isLoadingSubmit){
      reset();
    }
  }, [ reset, isSubmitSuccessful, isLoadingSubmit ]);

  return (
    <section className="deposit-form">
      <h2 className="deposit-form__title">Deposit</h2>
      <form className="deposit-form__form" onSubmit={handleSubmit(submitHandler)}>

        <div className="deposit-form__field">
          <label htmlFor="deposit-type" className="deposit-form__label">Deposit Type</label>
          <select
            id="deposit-type"
            className="deposit-form__select"
            value={depositType}
            onChange={handleTypeChange}
            disabled={isLoadingSubmit}
          >
            <option value={DEPOSIT_TYPE.BRANCH}>Deposit from Branch</option>
            <option value={DEPOSIT_TYPE.ATM}>Deposit from ATM</option>
            <option value={DEPOSIT_TYPE.ACCOUNT}>Deposit from Another Account</option>
          </select>
        </div>

       
        <div className="deposit-form__field">
          <label htmlFor="account" className="deposit-form__label">Account Number</label>
          <input
            id="account"
            type="text"
            className="deposit-form__input"
            placeholder="Enter account number"
            disabled={isLoadingSubmit}
            {...register('accountDestination', {
              required: 'Account number is required',
              pattern: {
                value: /^[0-9]*$/,
                message: 'Account number must be numeric',
              },
              minLength:{
                value: 5,
                message: 'Account number must be at least 8 digits',
              }
            })}
           
          />
          {errors.accountDestination && <span className="deposit-form__error">{errors.accountDestination.message}</span>}
        </div>

        <div className="deposit-form__field">
          <label htmlFor="amount" className="deposit-form__label">Amount</label>
          <input
            id="amount"
            type="number"
            className="deposit-form__input"
            placeholder="Enter amount"
            disabled={isLoadingSubmit}
            {...register('amount', { 
              required: 'Amount is required',
              min: {
                value: 1, 
                message: 'Amount must be greater than 0' 
              } 
            })}
          />
          {errors.amount && <span className="deposit-form__error">{errors.amount.message}</span>}
        </div>

        <button 
          type="submit" 
          className="deposit-form__button"
          disabled={isLoadingSubmit}
        >
          {isLoadingSubmit && <FaSpinner className='deposit-form__spinner' /> }
           Deposit
        </button>
      </form>
    </section>
  );
};

