import { MODAL_TYPE, ModalShareContentType } from './modal-share';

export enum ModalShareActions  {
   OPEN_MODAL = 'OPEN_MODAL',
   CLOSE_MODAL = 'CLOSE_MODAL',
   SET_SHARE_MODAL_CONTENT = 'SET_SHARE_MODAL_CONTENT',
};
  
export type ModalSharePayloads = {
  [ModalShareActions.OPEN_MODAL]: { modaltype: MODAL_TYPE };
  [ModalShareActions.CLOSE_MODAL]: { modaltype: MODAL_TYPE };
  [ModalShareActions.SET_SHARE_MODAL_CONTENT]: { 
    modaltype: MODAL_TYPE, 
    content: ModalShareContentType 
  };
};