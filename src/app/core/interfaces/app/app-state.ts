import { IAccountInfo } from '@core-interfaces/app/account';
import { AccountPayloads } from './account-reducer';
import { IModalShare } from './modal-share';
import { ModalSharePayloads } from './modal-share-reducer';

export interface IAppContext {
    state: IAppContextState
    dispatch: React.Dispatch<IAppAction>;
} 

//  ==>Types for all states
export type IAppContextState = IAccountInfo & IModalShare;

export interface IAppAction <T extends keyof AppPayloadInformation = keyof AppPayloadInformation > {
  type: T;
  payload: AppPayloadInformation[T];
};

// ==> Type for all payloads acording types actions
export type AppPayloadInformation = AccountPayloads & ModalSharePayloads;


