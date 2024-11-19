import { ModalShareActions, ModalSharePayloads } from '@core-interfaces/app/modal-share-reducer';

export const openShareModalAction = (payload: ModalSharePayloads['OPEN_MODAL']) => {
  return {
    type: ModalShareActions.OPEN_MODAL,
    payload
  };
};

export const closeShareModalAction = (payload: ModalSharePayloads['CLOSE_MODAL']) => {
  return {
    type: ModalShareActions.CLOSE_MODAL,
    payload
  };
};

export const setShareModalContentAction = (payload: ModalSharePayloads['SET_SHARE_MODAL_CONTENT']) => {
  return {
    type: ModalShareActions.SET_SHARE_MODAL_CONTENT,
    payload
  };
};