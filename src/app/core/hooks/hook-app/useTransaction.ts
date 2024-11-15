import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '@core-state/app-context/AppContext';
import { 
  depositAccount,
  depositATM,
  depositBranch, 
  purchaseOnline, 
  purchasePhysical
} from '@core-state/app-context/account/actions';
import { DEPOSIT_TYPE, PURCHASE_TYPE } from '@core-constants/transaction';
import { depositService } from '@core-services/transactions/deposit.service';
import { purchaseService } from '@core-services/transactions/purchase.service';

export const useTransaction = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);


  const hadleDeposit = async ( type: DEPOSIT_TYPE, 
    data: {
    accountDestination: string;
    amount: number; 
  }) => {
    setIsLoading(true);

    if(type === DEPOSIT_TYPE.BRANCH) {
      const response = await depositService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        accountDestination: data.accountDestination,
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( depositBranch( { 
        balance: response?.data?.saldoActual 
      }));

      setIsLoading(false);
      navigate('/home/dashboard');

      return response?.data?.detalle;
    }

    if(type === DEPOSIT_TYPE.ACCOUNT) {
      const response = await depositService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        accountDestination: data.accountDestination,
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( depositAccount( { 
        balance: response?.data?.saldoActual 
      }));

      setIsLoading(false);
      navigate('/home/dashboard');
      return response?.data?.detalle;
    }

    if(type === DEPOSIT_TYPE.ATM) {
      const response = await depositService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        accountDestination: data.accountDestination,
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( depositATM( { 
        balance: response?.data?.saldoActual 
      }));

      setIsLoading(false);
      navigate('/home/dashboard');
      return response?.data?.detalle;
    }
  };

  const handlePurchase = async ( type: PURCHASE_TYPE, 
    data: {
    amount: number; 
  }) => {
    setIsLoading(true);

    if(type === PURCHASE_TYPE.PHYSICAL) {
      const response = await purchaseService ({
        amount: `${data.amount}`,
        accountUser: '987654321',
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( purchasePhysical( { 
        balance: response?.data?.saldoActual 
      }));

      setIsLoading(false);
      navigate('/home/dashboard');
      return response?.data?.detalle;
    }

    if(type === PURCHASE_TYPE.ONLINE) {
      const response = await purchaseService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( purchaseOnline( { 
        balance: response?.data?.saldoActual 
      }));

      setIsLoading(false);
      navigate('/home/dashboard');
      return response?.data?.detalle;
    }
  };


  return {
    loadingOperations: isLoading,
    hadleDeposit,     
    handlePurchase,
  }; 
};