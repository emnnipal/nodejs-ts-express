import { Router } from 'express'
import Controller from '../controller'

export const api: Router = Router()
const controller = new Controller()

api.get('/get', controller.get)
api.post('/set', controller.set)
