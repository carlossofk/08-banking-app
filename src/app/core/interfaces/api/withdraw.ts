
// ==> Request Types
export interface IWithdraw {
  cuentaOrigen: string;
  monto: string;
  customer: string;
}

// ==> Response Types
export interface IWithdrawResponse <T> {
cuentaOrigen: string;
saldoActual:  number;
detalle:      T;
}

export interface Detalle {
montoDeposito:    number;
costoDeposito:    number;
tipoDeposito:     string;
cuentaOrigen:     string;
fechaTransaccion: Date;
}
