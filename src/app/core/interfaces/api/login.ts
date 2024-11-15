import { RolUser } from '@core-interfaces/shared/user';

export interface Login{
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    roles: RolUser[]
}

