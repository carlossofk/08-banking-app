import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.scss';

interface WithdrawalFormProps {
  onSubmit: (data: { amount: number }) => void;
}

interface FormValues {
  amount: number;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ onSubmit }) => {

  const [ transactionFee ] = useState(1); 
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormValues>();

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit({ amount: data.amount });
  };


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

        <button type="submit" className="withdrawal-form__button">
          Submit
        </button>
      </form>
    </section>
  );
};

