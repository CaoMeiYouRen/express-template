import dotenv = require('dotenv')
import path = require('path')
import fs = require('fs-extra')
const modes = [
    '.env.local',
    '.env',
]
let envParsed = {}
for (let i = 0; i < modes.length; i++) {
    const mode = modes[i]
    const result = dotenv.config({ path: mode })
    if (result.parsed) {
        envParsed = Object.assign(result.parsed, envParsed)
    }
}
if (process.env.NODE_ENV === 'development') {
    console.log(envParsed)
}
const env = process.env
export const PORT = Number(process.env.PORT || 5000)
/**
 * 本机数据库的账号
 */
const auth = { user: 'test', password: '123456' }

const rootUrl = '/'
export { rootUrl, auth }