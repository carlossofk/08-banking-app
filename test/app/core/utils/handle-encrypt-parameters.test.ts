import { desencriptarAES, encriptarAES } from '@core-utils/handle-encrypt-parameters';
import { environment } from 'src/environment/environment';


describe('AES Encryption Utilities', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('encriptarAES should return a valid encrypted string', async () => {
    const plainText = 'Hello, World!';
    const encryptedText = await encriptarAES(plainText);

    expect(typeof encryptedText).toBe('string');
    expect(encryptedText).not.toBe('');

    const decryptedText = await desencriptarAES(encryptedText);
    expect(decryptedText).toBe(plainText);
  });


  test('desencriptarAES should decrypt a valid encrypted string', async () => {
    const plainText = 'Test de encriptación';
    const encryptedText = await encriptarAES(plainText);

    const decryptedText = await desencriptarAES(encryptedText);
    expect(decryptedText).toBe(plainText);
  });


  test('desencriptarAES should throw an error for invalid encrypted string', async () => {
    const invalidEncryptedText = 'TextoNoValido';
    await expect(desencriptarAES(invalidEncryptedText)).rejects.toThrow();
  });


  test('encriptarAES should use environment keys correctly', async () => {
    const spyImportKey = vi.spyOn(crypto.subtle, 'importKey');
    const spyEncrypt = vi.spyOn(crypto.subtle, 'encrypt');

    const plainText = 'Prueba de claves';
    await encriptarAES(plainText);

    expect(spyImportKey).toHaveBeenCalledWith(
      'raw',
      new TextEncoder().encode(environment.KEY_LLAVESIMETRICA),
      { name: 'AES-CBC', length: 128 },
      false,
      [ 'encrypt' ]
    );

    expect(spyEncrypt).toHaveBeenCalled();
  });

  test('desencriptarAES should use environment keys correctly', async () => {
    const spyImportKey = vi.spyOn(crypto.subtle, 'importKey');
    const spyDecrypt = vi.spyOn(crypto.subtle, 'decrypt');

    const plainText = 'Otro texto';
    const encryptedText = await encriptarAES(plainText);
    await desencriptarAES(encryptedText);

    expect(spyImportKey).toHaveBeenCalledWith(
      'raw',
      new TextEncoder().encode(environment.KEY_LLAVESIMETRICA),
      { name: 'AES-CBC', length: 128 },
      false,
      [ 'decrypt' ]
    );

    expect(spyDecrypt).toHaveBeenCalled();
  });
});
