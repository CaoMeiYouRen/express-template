import morgan from 'morgan'
import path from 'path'
import fs from 'fs-extra'
// import FileStreamRotator from 'file-stream-rotator'
import { timeFormat } from '@/utils'
const logDir = path.join(__dirname, '../../logs')
morgan.token('time', (req, res) => timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSSZ'))
morgan.format('app-combined', ':remote-addr - [:time] ":method :url HTTP/:http-version" :status - :response-time ms')
morgan.format('app-db-log', ':remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms ":referrer" ":user-agent"')
morgan.format('json', JSON.stringify({
    ip: ':remote-addr',
    method: ':method',
    url: ':url',
    http: ':http-version',
    status: ':status',
    'response-time': ':response-time',
    referrer: ':referrer',
    'user-agent': ':user-agent'
}))
// const accessLogStream = FileStreamRotator.getStream({
//     date_format: 'YYYY-MM-DD',
//     filename: path.join(logDir, '%DATE%.log'),
//     frequency: 'daily',
//     verbose: false
// })
// const dbStream = {
//     async write(line: any) {
//         try {
//             const log = new Log(JSON.parse(line))
//             log.save()
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }

export const logger = morgan('app-combined')