export interface RequestAPI<T> {
    dinHeader: DINHeader;
    dinBody:   T;
    dinError?:  DINError;
}

export interface ResponseAPI<T> {
    dinHeader?: DINHeader;
    dinBody:   T;
    dinError?:  DINError;
}

export interface DINHeader {
    dispositivo:          string;
    idioma:               string;
    uuid:                 string;
    ip:                   string;
    horaTransaccion:      string;
    llaveSimetrica:       string;
    vectorInicializacion: string;
}

export interface DINError {
    tipo:                 string;
    fecha:                string;
    origen:               string;
    codigo:               string;
    codigoErrorProveedor: string;
    mensaje:              string;
    detalle:              string;
}


