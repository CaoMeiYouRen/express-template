import morgan from 'morgan'
import path from 'path'
import * as FileStreamRotator from 'file-stream-rotator'
import { timeFormat } from '@/utils'
const logDir = path.resolve('logs')
morgan.token('time', (req, res) => timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSSZ'))
morgan.format('app-combined', '[:time] :remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms')
morgan.format('console-combined', '[:time] :remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms')
morgan.format('json', JSON.stringify({
    ip: ':remote-addr',
    method: ':method',
    url: ':url',
    http: ':http-version',
    status: ':status',
    'response-time': ':response-time',
    referrer: ':referrer',
    'user-agent': ':user-agent',
}))
const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDir, '%DATE%.log'),
    audit_file: path.join(logDir, '.audit.json'),
    frequency: 'daily',
    verbose: false,
    size: '1g',
    max_logs: '30d',
})

export const fileLogger = morgan('app-combined', { stream: accessLogStream })
export const consoleLogger = morgan('console-combined', {})
