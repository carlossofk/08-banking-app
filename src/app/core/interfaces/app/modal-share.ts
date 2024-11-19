import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';

export interface IModalShare {
  modalShare: Record<MODAL_TYPE, { isOpen: boolean }>;
  modalShareContent?: Record<MODAL_TYPE, ModalShareContentType | undefined>
}

// Add more types
export enum MODAL_TYPE {
  MODAL_TRANSACTION = 'MODAL_TRANSACTION',
}

export type ModalShareContentType = Partial<ITransactionMapperToApp>