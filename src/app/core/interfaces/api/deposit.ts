
// ==> Request Types
export interface IDeposit {
    cuentaOrigen: string;
    cuentaDestino: string;
    monto: string;
    customer: string;
}

// ==> Response Types
export interface IDespositResponse <T> {
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
