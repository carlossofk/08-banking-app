import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEPOSIT_TYPE, PURCHASE_TYPE } from '@core-constants/transaction';

import { AppContext } from '@core-state/app-context/AppContext';
import { deposit, purchase, withdraw } from '@core-state/app-context/account/actions';

import { depositBranchService } from '@core-services/transactions/depositBranch.service';
import { purchaseOnlineService } from '@core-services/transactions/purchaseOnline.service';
import { depositAccountService } from '@core-services/transactions/depositAccount.service';
import { depositAtmService } from '@core-services/transactions/depositAtm.service';
import { purchasePhysicalService } from '@core-services/transactions/purchasePhysical.service';
import { withdrawService } from '@core-services/transactions/withdraw.service';

export const useTransaction = () => {

  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);


  const handleDeposit = async ( type: DEPOSIT_TYPE, 
    data: {
    accountDestination: string;
    amount: number; 
  }) => {
    setIsLoading(true);

    if(type === DEPOSIT_TYPE.BRANCH) {
      const response = await depositBranchService({
        amount: `${data.amount}`,
        accountUser: '987654321', // TODO: Get user account
        accountDestination: data.accountDestination,
        customerUser: 'carlos_vip' // TODO: Get user customer
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( 
        deposit( {
          accountNumber: response?.data?.accountOrigin,
          newAmout: response?.data?.balance
        }) 
      );

      setIsLoading(false);
      navigate('/home/dashboard');

      return response?.data;
    }

    if(type === DEPOSIT_TYPE.ACCOUNT) {
      const response = await depositAccountService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        accountDestination: data.accountDestination,
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( 
        deposit( {
          accountNumber: response?.data?.accountOrigin,
          newAmout: response?.data?.balance
        } ) 
      );

      setIsLoading(false);
      navigate('/home/dashboard');

      return response?.data;
    }

    if(type === DEPOSIT_TYPE.ATM) {
      const response = await depositAtmService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        accountDestination: data.accountDestination,
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( 
        deposit( {
          accountNumber: response?.data?.accountOrigin,
          newAmout: response?.data?.balance
        } ) 
      );

      setIsLoading(false);
      navigate('/home/dashboard');

      return response?.data;
    }
  };

  const handlePurchase = async ( type: PURCHASE_TYPE, 
    data: {
    amount: number; 
  }) => {
    setIsLoading(true);

    if(type === PURCHASE_TYPE.ONLINE) {
      const response = await purchaseOnlineService({
        amount: `${data.amount}`,
        accountUser: '987654321',
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( purchase( { 
        accountNumber: response?.data?.accountOrigin,
        newAmout: response?.data?.balance
      }));

      setIsLoading(false);
      navigate('/home/dashboard');
      return response?.data;
    }
    
    if(type === PURCHASE_TYPE.PHYSICAL) {
      const response = await purchasePhysicalService ({
        amount: `${data.amount}`,
        accountUser: '987654321',
        customerUser: 'carlos_vip'
      });

      if(!response.ok || !response.data) {
        setIsLoading(false);
        return;
      }

      dispatch( purchase( { 
        accountNumber: response?.data?.accountOrigin,
        newAmout: response?.data?.balance
      }));

      setIsLoading(false);
      navigate('/home/dashboard');
      return response?.data;
    }
  };

  const handleWithdraw = async (amount: number) => {
    setIsLoading(true);
    const response = await withdrawService({
      amount: `${amount}`, 
      accountUser: '987654321',
      customerUser: 'carlos_vip' 
    });

    if(!response.ok || !response.data) {
      setIsLoading(false);
      return;
    }

    dispatch(withdraw({
      accountNumber: response?.data?.accountOrigin,
      newAmout: response?.data?.balance
    }));

    setIsLoading(false);
    navigate('/home/dashboard');
    return response?.data;
  };

  return {
    loadingOperations: isLoading,
    handleDeposit,     
    handlePurchase,
    handleWithdraw
  }; 
};