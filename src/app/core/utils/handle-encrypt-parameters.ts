import { environment } from 'src/environment/environment';

export async function encriptarAES(textoClaro: string) {
  const llaveBuffer = new TextEncoder().encode(environment.KEY_LLAVESIMETRICA);
  const ivBuffer = new TextEncoder().encode(environment.KEY_VECTORINICIALIZACION);

  const key = await crypto.subtle.importKey(
    'raw',
    llaveBuffer,
    { name: 'AES-CBC', length: 128 },
    false,
    [ 'encrypt' ]
  );

  const datosBuffer = new TextEncoder().encode(textoClaro);
  const encriptadoBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: ivBuffer },
    key,
    datosBuffer
  );

  return btoa(
    String.fromCharCode(
      ...new Uint8Array(encriptadoBuffer)
    )
  );
}

export async function desencriptarAES(textoEncriptado: string) {
  const llaveBuffer = new TextEncoder().encode(environment.KEY_LLAVESIMETRICA);
  const ivBuffer = new TextEncoder().encode(environment.KEY_VECTORINICIALIZACION);

  const key = await crypto.subtle.importKey(
    'raw',
    llaveBuffer,
    { name: 'AES-CBC', length: 128 },
    false,
    [ 'decrypt' ]
  );

  const datosEncriptados = Uint8Array.from(atob(textoEncriptado), (c) => c.charCodeAt(0));

  const desencriptadoBuffer = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: ivBuffer },
    key,
    datosEncriptados
  );

  return new TextDecoder().decode(desencriptadoBuffer);
}

