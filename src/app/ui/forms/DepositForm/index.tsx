import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.scss';
import { DEPOSIT_TYPE } from '@core-constants/transaction';


interface FormValues {
  accountDestination: string;
  amount: number;
}

interface DepositFormProps {
  handleSubmitForm: (type: DEPOSIT_TYPE, data: { accountDestination: string; amount: number }) => void;
  isLoadingSubmit: boolean;
}

export const DepositForm: React.FC<DepositFormProps> = ({ handleSubmitForm, isLoadingSubmit }) => {
  const [ depositType, setDepositType ] = useState<DEPOSIT_TYPE>(DEPOSIT_TYPE.BRANCH);
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<FormValues>();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepositType(e.target.value as DEPOSIT_TYPE);
  };

  // const calculateTotal = (amount: number): number => {
  //   switch (depositType) {
  //   case DEPOSIT_TYPE.ATM:
  //     return amount + 2;

  //   case DEPOSIT_TYPE.ACCOUNT:
  //     return amount + 1.5; 

  //   default:
  //     return amount;
  //   }
  // };

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    
    handleSubmitForm(depositType, { 
      accountDestination: data.accountDestination, 
      amount: data.amount,
    });
  };

  useEffect(() => {
    reset();
  }, [ depositType, reset, isSubmitSuccessful ]);

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
          >
            <option value={DEPOSIT_TYPE.BRANCH}>Deposit from Branch</option>
            <option value={DEPOSIT_TYPE.ATM}>Deposit from ATM</option>
            <option value={DEPOSIT_TYPE.ACCOUNT}>Deposit from Another Account</option>
          </select>
        </div>

        {/* Cuenta de Destino */}
        <div className="deposit-form__field">
          <label htmlFor="account" className="deposit-form__label">Account Number</label>
          <input
            id="account"
            type="text"
            className="deposit-form__input"
            placeholder="Enter account number"
            {...register('accountDestination', {
              required: 'Account number is required',
              pattern: {
                value: /^[0-9]*$/,
                message: 'Account number must be numeric',
              },
              minLength:{
                value: 5,
                message: 'The account number must be at least 8 digits',
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
          Submit
        </button>
      </form>
    </section>
  );
};

