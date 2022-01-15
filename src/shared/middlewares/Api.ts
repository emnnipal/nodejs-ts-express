import { HttpResponses } from '../constants/Http';

import { Request, Response } from 'express';

class APIMiddleware {
  static notFound(_: Request, res: Response): void {
    res.status(404);
    res.json(HttpResponses.notFound);
    res.end();
  }
}

export default APIMiddleware;
