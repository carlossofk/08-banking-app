import { v4 as uuidv4 } from 'uuid';
import {  DINHeader } from '@core/interfaces/api/request-response';


export const dinHeaderMapper = (dinheader: Pick<DINHeader, 'ip' | 'llaveSimetrica' | 'vectorInicializacion'>): DINHeader => {
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
    llaveSimetrica:       dinheader.llaveSimetrica,
    vectorInicializacion: dinheader.vectorInicializacion,
  };
};