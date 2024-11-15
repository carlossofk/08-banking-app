
// ==> Request Types
export interface IPurchase {
  cuentaOrigen: string;
  monto: string;
  customer: string;
}

// ==> Response Types
export interface IPurchaseResponse <T> {
cuentaOrigen: string;
saldoActual:  number;
detalle:      T;
}

export interface Detalle {
montoDeposito:    number;
costoDeposito:    number;
tipoDeposito:     string;
cuentaOrigen:     string;
cuentaDestino:    string;
fechaTransaccion: Date;
}
