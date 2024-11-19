export interface ITransactionMapperToApp {
  accountDestination: string;
  accountOrigin:      number;
  balance:            number;
  typeTransaction:    string;
  taxTransaction:     number;
  amountTransaction:  number;
}