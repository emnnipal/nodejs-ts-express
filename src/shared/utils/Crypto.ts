import crypto from 'crypto';

const algorithm = 'aes-192-cbc';
const key = crypto
  .createHash('sha256')
  .update(String('Secret Key'))
  .digest('base64')
  .substring(0, 24);

class CryptoUtil {
  static encrypt(clearText: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(clearText, 'utf8', 'hex');
    return [encrypted + cipher.final('hex'), Buffer.from(iv).toString('hex')].join(':');
  }

  static decrypt(encryptedText: string) {
    const [encrypted, iv] = encryptedText.split(':');
    if (!iv) throw new Error('IV not found');
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  }
}

export default CryptoUtil;
