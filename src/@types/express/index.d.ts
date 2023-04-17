import { logger } from '../../modules/shared/utils/logger';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: typeof logger;
      requestId: string;
      user: {
        id: string;
        email: string;
      };
    }
  }
}
