
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
montoCompra:       number;
costoCompra:       number;
tipoCompra:        string;
cuentaOrigen:      string;
fechaTransaccion:  Date;
}
