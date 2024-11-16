import { IAccountInfo } from '@core-interfaces/app/account';
import { AccountPayloads } from './account-reducer';

export interface IAppContext {
    state: IAppContextState
    dispatch: React.Dispatch<IAppAction>;
} 

//  ==>Types for all states
export type IAppContextState = IAccountInfo;

export interface IAppAction <T extends keyof AppPayloadInformation = keyof AppPayloadInformation > {
  type: T;
  payload: AppPayloadInformation[T];
};

// ==> Type for all payloads acording types actions
export type AppPayloadInformation = AccountPayloads;


