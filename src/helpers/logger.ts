import moment from 'moment-timezone'

export const getTimestamp = () => moment().format()
export const getUnixTimestamp = () => moment().valueOf()