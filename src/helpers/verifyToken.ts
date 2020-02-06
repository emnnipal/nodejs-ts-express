import { Request, Response } from 'express';
import { getTimestamp } from '../helpers/logger'
import CONFIG from '../config/config'
import { MISSING_AUTHORIZATION_TOKEN, UNAUTHORIZED, } from '../enums/Messages'

const verifyToken = async (req: Request, res: Response, next): Promise<any> => {
  try {
    const token = req.headers.authorization;
    if (token === CONFIG.AUTHORIZATION_KEY) {
      return next()
    } else {
      console.log(getTimestamp(), 'verifyToken', MISSING_AUTHORIZATION_TOKEN)
      return res.status(401).send({ success: false, message: MISSING_AUTHORIZATION_TOKEN })
    }
  } catch (err) {
    console.log(getTimestamp(), 'verifyToken', err.message)
    res.status(401).send({ success: false, message: UNAUTHORIZED })
  }
};

export default verifyToken
