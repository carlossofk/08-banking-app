import { IModalShare } from '@core-interfaces/app/modal-share';
import { ModalShareActions, ModalSharePayloads } from '@core-interfaces/app/modal-share-reducer';

export const modalShareCases = {
  [ModalShareActions.OPEN_MODAL]: (state: IModalShare, payload:ModalSharePayloads['OPEN_MODAL']): IModalShare => {
    
    const modalShareUpdated = {
      ...state.modalShare,
      [payload.modaltype]: {
        isOpen: true,
      },
    };
    return {
      ...state,
      modalShare: modalShareUpdated,
    };
  },  

  [ModalShareActions.CLOSE_MODAL]: (state: IModalShare, payload:ModalSharePayloads['CLOSE_MODAL']): IModalShare => {
    const modalShareUpdated = {
      ...state.modalShare,
      [payload.modaltype]: {
        isOpen: false,
      },
    };
    return {
      ...state,
      modalShare: modalShareUpdated,
    };
  }, 
  
  [ModalShareActions.SET_SHARE_MODAL_CONTENT]: (state: IModalShare, payload:ModalSharePayloads['SET_SHARE_MODAL_CONTENT']): IModalShare => {
    const modalShareUpdated = {
      ...state.modalShareContent,
      [payload.modaltype]: {
        ...payload.content,
      },
    };
    return {
      ...state,
      modalShareContent: modalShareUpdated,
    };
  },
  
};
