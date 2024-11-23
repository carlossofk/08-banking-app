import { useModalShare } from '@core-hooks/hook-app/useModalShare';
import { modalShareInitialState } from '@core-state/app-context/modal-share/initalState';
import { renderHook } from '@testing-library/react';
import { renderMockAppContext } from 'test/mocked-functions/render-mock-app-context';

describe('<useModalShare />', () => {
  
  test('Should return the openShareModal function', () => {
    const { result } = renderHook(() => useModalShare());
    expect(result.current.openShareModal).toBeDefined();
    expect(result.current.openShareModal).toBeInstanceOf(Function);
  });
  

  test('Should return the setDataShareModal function', () => {
    const { result } = renderHook(() => useModalShare());
    expect(result.current.setDataShareModal).toBeDefined();
    expect(result.current.setDataShareModal).toBeInstanceOf(Function);
  });
  
  
  test('Should return the closeShareModal function', () => {
    const { result } = renderHook(() => useModalShare());
    expect(result.current.closeShareModal).toBeDefined();
    expect(result.current.closeShareModal).toBeInstanceOf(Function);
  });


  test('Should return the modalState and modalContent', () => {
    const wrapperMock = renderMockAppContext({
      stateMock: {
        ...modalShareInitialState,
        bankAccounts: [] ,
      },
    });
    const { result } = renderHook(() => useModalShare(), { wrapper: wrapperMock });
    expect(result.current.modalState).toBeDefined();
    expect(result.current.modalContent).toBeUndefined();
  });

});