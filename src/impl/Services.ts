import { IParams } from '../interface/Params'

class Services {
  constructor() {
  }

  public createBooking = (body: IParams): Promise<string> => {
    return Promise.resolve(`Booked ${body.name}`)
  }
}

export default Services