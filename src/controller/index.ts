import { Request, Response } from 'express'
import Services from '../impl/Services'

class Controller {
  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      res.status(200)
      res.json({
        success: true,
      })
    } catch (err) {
      res.status(400).send({
        success: false,
        result: err.message
      })
    }
  }

  public set = async (req: Request, res: Response): Promise<any> => {
    try {
      const Customer: Services = new Services()
      const result = await Customer.createBooking(req.body)
      res.status(200)
      res.json({
        success: true,
        result
      })
    } catch (err) {
      res.status(400).send({
        success: false,
        message: err.message
      })
    }
  }
}

export default Controller