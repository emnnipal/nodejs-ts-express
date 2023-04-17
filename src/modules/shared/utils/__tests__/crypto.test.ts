import CryptoUtil from '../crypto';

import { describe, expect, it } from 'vitest';

describe('CryptoUtil', () => {
  const mockString = 'randomString';

  describe('Encrypt', () => {
    it('should work without errors', () => {
      const encrypted = CryptoUtil.encrypt(mockString);

      expect(encrypted).not.toBe(mockString);
      expect(encrypted).toContain(':');
      expect(encrypted.split(':')).toHaveLength(2);
    });
  });

  describe('Decrypt', () => {
    it('should work without errors', () => {
      const encrypted = CryptoUtil.encrypt(mockString);
      const decrypted = CryptoUtil.decrypt(encrypted);

      expect(decrypted).toBe(mockString);
      expect(encrypted).not.toBe(decrypted);
    });

    describe('given an invalid value', () => {
      it('should throw an error', () => {
        expect(() => CryptoUtil.decrypt('test')).toThrow('IV not found');
      });
    });
  });
});
