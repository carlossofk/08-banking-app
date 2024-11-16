import { RolUser } from '@core-interfaces/auth/user';

export interface Login{
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    roles: RolUser[];
    cuentas: AccountBank[];
    username: string;
}

export interface AccountBank {
    id:         number;
    number:     number;
    amount:     number;
    customer:   null;
    customerId: number;
    createdAt:  Date;
    deleted:    boolean;
}

// type RolesUser = 'VIP' | 'USER';