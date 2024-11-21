import { useNavigate } from 'react-router-dom';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';

import './styles.scss';
import { formatCurrency } from '@core-utils/format';

interface Props {
  data?: Partial<ITransactionMapperToApp> 
  closeModal: () => void
}

export const TransactionDetails = ({ data , closeModal }: Props) => {

  const navigate = useNavigate();

  const { 
    accountOrigin = '-', 
    accountDestination = '-', 
    balance = 0, 
    typeTransaction = '-', 
    taxTransaction = 0,
    amountTransaction = 0,
  } = data || {};

  const handleCloseModal = () => {
    closeModal();
    navigate('/home/dashboard');
  };
  
  return (
    <section className="transaction-details">
      <div className="transaction-details__header">
        <FaMoneyCheckAlt className="transaction-details__header__icon" />
        <h2 className="transaction-details__header__title">Transaction Details</h2>
      </div>
      <div className="transaction-details__content">
        <div className="transaction-details__row">
          <span className="transaction-details__row__label">Account Origin:</span>
          <span className="transaction-details__row__value">{accountOrigin}</span>
        </div>
        <div className="transaction-details__row">
          <span className="transaction-details__row__label">Account Destination:</span>
          <span className="transaction-details__row__value">{accountDestination}</span>
        </div>
        <div className="transaction-details__row">
          <span className="transaction-details__row__label">Balance:</span>
          <span className="transaction-details__row__value">{formatCurrency(balance)}</span>
        </div>
        <div className="transaction-details__row">
          <span className="transaction-details__row__label">Transaction Type:</span>
          <span className="transaction-details__row__value">{typeTransaction}</span>
        </div>
        <div className="transaction-details__row">
          <span className="transaction-details__row__label">Tax:</span>
          <span className="transaction-details__row__value">{formatCurrency(taxTransaction)}</span>
        </div>
        <div className="transaction-details__row">
          <span className="transaction-details__row__label">Transaction Amount:</span>
          <span className="transaction-details__row__value">{formatCurrency(amountTransaction)}</span>
        </div>
      </div>
      <div className='transaction__actions'>
        <button 
          className='transaction__actions--finalize'
          data-testid="transaction-details-finalize"
          onClick={handleCloseModal}
        >
          Finalize
        </button>
      </div>
    </section>
  );
};