import { v4 as uuidv4 } from 'uuid';
import {  DINHeader } from '@core/interfaces/api/request-response';
import { environment } from 'src/environment/environment';


export const dinHeaderMapper = (dinheader: Pick<DINHeader, 'ip'>): DINHeader => {
  const dispositivo = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'PC';
  const idioma = navigator.language || 'es';
  const uuid = uuidv4();
  const horaTransaccion = new Date().toISOString();

  return {
    dispositivo:          dispositivo,
    idioma:               idioma,
    uuid:                 uuid,
    ip:                   dinheader.ip || 'localhost',
    horaTransaccion:      horaTransaccion,
    llaveSimetrica:       environment.KEY_LLAVESIMETRICA,       
    vectorInicializacion: environment.KEY_VECTORINICIALIZACION,
  };
};