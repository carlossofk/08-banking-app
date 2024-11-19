import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PURCHASE_TYPE } from '@core-constants/transaction';
import { useModalShare } from '@core-hooks/hook-app/useModalShare';

import './styles.scss';
import { MODAL_TYPE } from '@core-interfaces/app/modal-share';
import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';
interface PurchaseFormProps {
  handleSubmitForm: (type: PURCHASE_TYPE, data: { amount: number }) => Promise<ITransactionMapperToApp | undefined>
  loadingSubmit: boolean;
}

interface FormValues {
  amount: number;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ handleSubmitForm, loadingSubmit }) => {
  const { openShareModal, setDataShareModal } = useModalShare();
  const [ purchaseType, setPurchaseType ] = useState<PURCHASE_TYPE>(PURCHASE_TYPE.PHYSICAL);
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPurchaseType(e.target.value as PURCHASE_TYPE);
  };

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const resp = await handleSubmitForm(purchaseType,{ amount: data.amount });
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
    if(!loadingSubmit){
      reset();
    }
  }, [ reset, isSubmitSuccessful, loadingSubmit ]);

  return (
    <section className="purchase-form">
      <h2 className="purchase-form__title">Purchase</h2>

      <form className="purchase-form__form" onSubmit={handleSubmit(submitHandler)}>

        <div className="purchase-form__field">
          <label htmlFor="purchase-type" className="purchase-form__label">Purchase Type</label>
          <select
            id="purchase-type"
            className="purchase-form__select"
            value={purchaseType}
            disabled={loadingSubmit}
            onChange={handleTypeChange}
          >
            <option value={PURCHASE_TYPE.PHYSICAL}>Purchase in Physical Store</option>
            <option value={PURCHASE_TYPE.ONLINE}>Purchase on Website</option>
          </select>
        </div>


        <div className="purchase-form__field">
          <label htmlFor="amount" className="purchase-form__label">Amount</label>
          <input
            id="amount"
            type="number"
            disabled={loadingSubmit}
            className="purchase-form__input"
            {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Amount must be greater than 0' } })}
            placeholder="Enter amount"
          />
          {errors.amount && <span className="purchase-form__error">{errors.amount.message}</span>}
        </div>
       

        <button 
          className="purchase-form__button"
          disabled={loadingSubmit}
          type="submit" 
        >
          {loadingSubmit && <FaSpinner className='purchase-form__spinner' /> }
          Purchased
        </button>
      </form>
    </section>
  );
};

export default PurchaseForm;
