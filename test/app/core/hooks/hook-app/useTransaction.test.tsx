import { act } from 'react';
import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { DEPOSIT_TYPE, PURCHASE_TYPE } from '@core-constants/transaction';
import { useTransaction } from '@core-hooks/hook-app/useTransaction';
import { depositBranchService } from '@core-services/transactions/depositBranch.service';
import { depositAccountService } from '@core-services/transactions/depositAccount.service';
import { depositAtmService } from '@core-services/transactions/depositAtm.service';
import { purchaseOnlineService } from '@core-services/transactions/purchaseOnline.service';
import { purchasePhysicalService } from '@core-services/transactions/purchasePhysical.service';
import { withdrawService } from '@core-services/transactions/withdraw.service';
import { modalShareInitialState } from '@core-state/app-context/modal-share/initalState';

import { renderMockAppContext } from 'test/mocked-functions/render-mock-app-context';

vi.mock('@core-services/transactions/depositBranch.service', () => ({ depositBranchService: vi.fn() }));
vi.mock('@core-services/transactions/depositAccount.service', () => ({ depositAccountService: vi.fn() }));
vi.mock('@core-services/transactions/depositATM.service', () => ({ depositAtmService: vi.fn() }));
vi.mock('@core-services/transactions/purchaseOnline.service', () => ({ purchaseOnlineService: vi.fn() }));
vi.mock('@core-services/transactions/purchasePhysical.service', () => ({ purchasePhysicalService: vi.fn() }));
vi.mock('@core-services/transactions/withdraw.service', () => ({ withdrawService: vi.fn() }));

describe('<useTransaction />', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should initialize with isLoading as false', () => {
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number:123456 } ] ,
      } });
    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
  
    expect(result.current.loadingOperations).toBe(false);
  });
  

  test('Should call depositBranchService and dispatch action on successful deposit (BRANCH)', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch,
    });
  
      
    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
      
    vi.mocked(depositBranchService).mockResolvedValue({
      ok: true,
      data: { 
        accountOrigin: 123456, 
        accountDestination: '789012',
        balance: 500,
        typeTransaction: 'Deposit',
        taxTransaction: 50,
        amountTransaction: 950,
      },
    });

    await act(async () => {
      const response = await result.current.handleDeposit(DEPOSIT_TYPE.BRANCH, {
        accountDestination: '789012',
        amount: 100,
      });
      expect(response).toEqual(expect.objectContaining({ accountOrigin: 123456, balance: 500 }));
    });

    expect(depositBranchService).toHaveBeenCalledWith({
      amount: '100',
      accountUser: '123456',
      accountDestination: '789012',
      customerUser: 'undefined',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DEPOSIT',
      payload: { accountNumber: 123456, newAmout: 500 },
    });
  });
  

  test('Should call depositAccountService and dispatch action on successful deposit (ACCOUNT)', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch,
    });

    vi.mocked( depositAccountService ).mockResolvedValue({
      ok: true,
      data: { 
        accountOrigin: 123456, 
        accountDestination: '789012',
        balance: 500,
        typeTransaction: 'Deposit',
        taxTransaction: 50,
        amountTransaction: 950,
      },
    });

    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    await act(async () => {
      const response = await result.current.handleDeposit(DEPOSIT_TYPE.ACCOUNT, {
        accountDestination: '789012',
        amount: 100,
      });
      expect(response).toEqual(expect.objectContaining({ accountOrigin: 123456, balance: 500 }));
    });

    expect(depositAccountService).toHaveBeenCalledWith({
      amount: '100',
      accountUser: '123456',
      accountDestination: '789012',
      customerUser: 'undefined',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DEPOSIT',
      payload: { accountNumber: 123456, newAmout: 500 },
    });
  });


  test('Should call depositATMService and dispatch action on successful deposit (ATM)', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch,
    });

    vi.mocked( depositAtmService ).mockResolvedValue({
      ok: true,
      data: { 
        accountOrigin: 123456, 
        accountDestination: '789012',
        balance: 500,
        typeTransaction: 'Deposit',
        taxTransaction: 50,
        amountTransaction: 950,
      },
    });

    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    await act(async () => {
      const response = await result.current.handleDeposit(DEPOSIT_TYPE.ATM, {
        accountDestination: '789012',
        amount: 100,
      });
      expect(response).toEqual(expect.objectContaining({ accountOrigin: 123456, balance: 500 }));
    });

    expect(depositAtmService).toHaveBeenCalledWith({
      amount: '100',
      accountUser: '123456',
      accountDestination: '789012',
      customerUser: 'undefined',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DEPOSIT',
      payload: { accountNumber: 123456, newAmout: 500 },
    });
  });


  test('Should call purchaseOnlineService and dispatch action on successful purchase (ONLINE)', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch,
    });
  
    vi.mocked( purchaseOnlineService ).mockResolvedValue({
      ok: true,
      data: { 
        accountOrigin: 123456, 
        balance: 500,
        typeTransaction: 'Purchase',
        taxTransaction: 50,
        amountTransaction: 950,
      },
    });
  
    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    await act(async () => {
      const response = await result.current.handlePurchase(PURCHASE_TYPE.ONLINE, {
        amount: 100,
      });
      expect(response).toEqual(expect.objectContaining({ accountOrigin: 123456, balance: 500 }));
    });
  
    expect(purchaseOnlineService).toHaveBeenCalledWith({
      amount: '100',
      accountUser: '123456',
      customerUser: 'undefined',
    });
  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'PURCHASE',
      payload: { accountNumber: 123456, newAmout: 500 },
    });
  });


  test('Should call purchasePhisicalService and dispatch action on successful purchase (PHYSICAL)', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch,
    });

    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    vi.mocked( purchasePhysicalService ).mockResolvedValue({
      ok: true,
      data: { 
        accountOrigin: 123456, 
        balance: 500,
        typeTransaction: 'Purchase',
        taxTransaction: 50,
        amountTransaction: 950,
      },
    });

    await act( async () => {
      const response = await result.current.handlePurchase(PURCHASE_TYPE.PHYSICAL, {
        amount: 100,
      });
      expect(response).toEqual(expect.objectContaining({ accountOrigin: 123456, balance: 500 }));
    });

    expect( purchasePhysicalService ).toHaveBeenCalledWith({
      amount: '100',
      accountUser: '123456',
      customerUser: 'undefined',
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'PURCHASE',
      payload: { accountNumber: 123456, newAmout: 500 },
    });
  }); 

  
  test('Should call withdrawService and dispatch action on successful withdraw', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch,
    });
  
    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    vi.mocked( withdrawService ).mockResolvedValue({
      ok: true,
      data: { 
        accountOrigin: 123456, 
        balance: 500,
        typeTransaction: 'Withdraw',
        taxTransaction: 50,
        amountTransaction: 950,
      },
    });
  
    await act(async () => {
      const response = await result.current.handleWithdraw(100);
      expect(response).toEqual(expect.objectContaining({ accountOrigin: 123456, balance: 500 }));
    });
  
    expect(withdrawService).toHaveBeenCalledWith({
      amount: '100',
      accountUser: '123456',
      customerUser: 'undefined',
    }); 
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'WITHDRAW',
      payload: { accountNumber: 123456, newAmout: 500 },
    });
  }); 


  test('Should LoadingOperations be true when handleDeposit is called', async () => {
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      } });
    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    expect(result.current.loadingOperations).toBe(false);
    await act(async () => {
      await result.current.handleDeposit(DEPOSIT_TYPE.BRANCH, {
        accountDestination: '789012',
        amount: 100,
      });
      waitFor(() => expect(result.current.loadingOperations).toBe(true));
    });
    
    expect(result.current.loadingOperations).toBe(false);
  });


  test('Should LoadingOperations be true when handlePurchase is called', async () => {
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      } });
    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
    
    expect(result.current.loadingOperations).toBe(false);
    await act(async () => {
      await result.current.handlePurchase(PURCHASE_TYPE.ONLINE, {
        amount: 100,
      });
      waitFor(() => expect(result.current.loadingOperations).toBe(true));
    });

    expect(result.current.loadingOperations).toBe(false);
  });


  test('Should LoadingOperations be true when handleWithdraw is called', async () => {
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      } });

    const { result } = renderHook(() => useTransaction(), { wrapper: wrapperMock });
  
    expect(result.current.loadingOperations).toBe(false);
    await act(async () => {
      await result.current.handleWithdraw(100);
      waitFor(() => expect(result.current.loadingOperations).toBe(true));  
    });

    expect(result.current.loadingOperations).toBe(false);
  });
});