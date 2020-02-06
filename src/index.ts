import app from './App'
import CONFIG from './config/config'
import moment from 'moment-timezone'
import { getTimestamp } from './helpers/logger'

moment.tz.setDefault('Asia/Manila');

const PORT = CONFIG.PORT
const APP = CONFIG.APP

app.listen(PORT, () => {
  console.log(getTimestamp(), `Listening on port ${PORT}. APP: ${APP}`)
})