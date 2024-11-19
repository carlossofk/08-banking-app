import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.scss';
import { useModalShare } from '@core-hooks/hook-app/useModalShare';
import { MODAL_TYPE } from '@core-interfaces/app/modal-share';
import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';
import { FaSpinner } from 'react-icons/fa';

interface WithdrawalFormProps {
  handleSubmitForm: (amount: number) => Promise<Omit<ITransactionMapperToApp, 'accountDestination'> | undefined>;
  loadingSubmit: boolean;
}

interface FormValues {
  amount: number;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ handleSubmitForm, loadingSubmit }) => {

  const { openShareModal, setDataShareModal } = useModalShare();
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors , isSubmitSuccessful } 
  } = useForm<FormValues>();


  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const resp = await handleSubmitForm(data.amount);
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

        <button
          type="submit" 
          className="withdrawal-form__button"
          disabled={loadingSubmit}
        >
          {loadingSubmit && <FaSpinner className='withdrawal-form__spinner' /> }
          Withdraw
        </button>
      </form>
    </section>
  );
};

