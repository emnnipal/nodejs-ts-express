/* eslint-disable @typescript-eslint/naming-convention */

export {};

declare global {
  namespace Express {
    export interface Request {
      accessToken: string;
      user: { id: string };
    }
  }
}
