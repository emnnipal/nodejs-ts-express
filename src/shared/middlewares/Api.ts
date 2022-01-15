import { HttpResponses } from '../constants/Http';

import { Request, Response } from 'express';

class APIMiddleware {
  static notFound(_: Request, res: Response): void {
    res.status(404);
    res.json(HttpResponses.notFound);
    res.end();
  }

  static healthCheck(_: Request, res: Response): void {
    res.status(200).send('OK!');
  }
}

export default APIMiddleware;
