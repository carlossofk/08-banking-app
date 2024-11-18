import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.scss';

interface WithdrawalFormProps {
  handleSubmitForm: (amount: number) => void;
  loadingSubmit: boolean;
}

interface FormValues {
  amount: number;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ handleSubmitForm, loadingSubmit }) => {

  const [ transactionFee ] = useState(1); 
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors , isSubmitSuccessful } 
  } = useForm<FormValues>();

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    handleSubmitForm(data.amount);
  };

  useEffect(() => {
    reset();
  }, [ reset, isSubmitSuccessful ]);
  
  return (
    <section className="withdrawal-form">

      <h2 className="withdrawal-form__title">ATM Withdrawal</h2>

      <form className="withdrawal-form__form" onSubmit={handleSubmit(submitHandler)}>

        <div className="withdrawal-form__field">
          <label htmlFor="amount" className="withdrawal-form__label">Amount</label>
          <input
            id="amount"
            type="number"
            className="withdrawal-form__input"
            {...register('amount', { 
              required: 'Amount is required', 
              min: { value: 1, message: 'Amount must be greater than 0' },
            })}
            placeholder="Enter amount"
          />
          {errors.amount && <span className="withdrawal-form__error">{errors.amount.message}</span>}
        </div>

        <div className="withdrawal-form__summary">
          <p className="withdrawal-form__text">Transaction Fee: <strong>${transactionFee}</strong></p>
        </div>

        <button
          type="submit" 
          className="withdrawal-form__button"
          disabled={loadingSubmit}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

