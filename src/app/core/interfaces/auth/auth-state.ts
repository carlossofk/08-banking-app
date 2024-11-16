import { ISession } from './session';
import { SessionPayloads } from './session-reducer';

export interface IAuthContext {
    state: IAuthContextState;
    dispatch: React.Dispatch<IAuthAction>;
} 

//  ==>Types for all states
export type IAuthContextState = ISession;

export interface IAuthAction <T extends keyof PayloadInformation = keyof PayloadInformation > {
  type: T;
  payload: PayloadInformation[T];
};

// ==> Type for all payloads acording types actions
export type PayloadInformation = SessionPayloads;


