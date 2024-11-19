import { IModalShare, MODAL_TYPE } from '@core-interfaces/app/modal-share';

const initialState = Object.values(MODAL_TYPE).reduce(
  (acc, key) => {
    acc[key] = {
      isOpen: false,
    };
    return acc;
  },
  {} as Record<MODAL_TYPE, { isOpen: boolean }>
);

export const modalShareInitialState: IModalShare = { modalShare: initialState };