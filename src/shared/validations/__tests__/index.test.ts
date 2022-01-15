import { Methods } from '../../../interfaces/Http';
import { validate } from '../index';

describe('Validations', () => {
  describe('given invalid method', () => {
    it('should throw an error', () => {
      expect(() => validate('test' as Methods)).toThrow('Missing validation schema');
    });
  });
});
