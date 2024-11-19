import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.scss';
import { PURCHASE_TYPE } from '@core-constants/transaction';
import { FaSpinner } from 'react-icons/fa';

interface PurchaseFormProps {
  handleSubmitForm: (type: PURCHASE_TYPE, data: { amount: number;  }) => void;
  loadingSubmit: boolean;
}

interface FormValues {
  amount: number;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ handleSubmitForm, loadingSubmit }) => {
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

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    handleSubmitForm(purchaseType,{ amount: data.amount });
  };

  useEffect(() => {
    reset();
  }, [ purchaseType, reset, isSubmitSuccessful ]);

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
            <option value="physical">Purchase in Physical Store</option>
            <option value="online">Purchase on Website</option>
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
