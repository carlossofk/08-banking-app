import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import useAccounts from '@core-hooks/hook-app/useAccounts';
import { renderMockAppContext } from 'test/mocked-functions/render-mock-app-context';
import { modalShareInitialState } from '@core-state/app-context/modal-share/initalState';
import { getKeySessionStorage, setKeySessionStorage } from '@core-utils/handle-session-client';
import { act } from 'react';

vi.mock('@core-utils/handle-session-client', () => ({ 
  setKeySessionStorage: vi.fn(),
  getKeySessionStorage: vi.fn(),
}));


describe('<useAccounts />', () => {
  
  test('Should not call setKeySessionStorage when the bankAccounts are not present', async() => {  
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [] ,
      },
    });
    
    const setKeySessionStorageMock = vi.mocked(setKeySessionStorage);
    
    renderHook(() => useAccounts(), { wrapper: wrapperMock });
    await waitFor(() => expect(setKeySessionStorageMock).not.toHaveBeenCalled());
  });

  test('Should dispatch accountInfo from session storage when the bankAccounts are present', async() => {  
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [ { id: 1, amount: 100, customerId: 1, number: 123456 } ] ,
      },
      mockDispatch
    });
    
    
    vi.mocked(getKeySessionStorage).mockReturnValueOnce(
      JSON.stringify([ { id: 1, amount: 100, customerId: 1, number: 123456 } ])
    );

    act(() => {
      renderHook(() => useAccounts(), { wrapper: wrapperMock });
    });
    
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({
      type: 'GET_ACCOUNT_SESSION_INFO',
      payload: {
        accountInfo: [ 
          { id: 1, amount: 100, customerId: 1, number: 123456 }
        ] 
      },
    }));
   
  }); 

});