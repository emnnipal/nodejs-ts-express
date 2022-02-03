import { IMethod } from '../../interfaces/Auth';
import { validate } from '../index';

describe('Validations', () => {
  describe('given invalid method', () => {
    it('should throw an error', () => {
      expect(() => validate('test' as IMethod, 'more test')).toThrow('Missing validation schema');
    });
  });
});
