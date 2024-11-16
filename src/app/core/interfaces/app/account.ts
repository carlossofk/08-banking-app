export interface IAccountInfo {
    bankAccounts: IBankAccount[]
}

export interface IBankAccount {
    id:         number;
    number:     number;
    amount:     number;
    customerId: number;
}