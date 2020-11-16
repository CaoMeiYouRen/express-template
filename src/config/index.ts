import dotenv = require('dotenv')
import path = require('path')
import fs = require('fs-extra')
const modes = [
    '.env.local',
    '.env'
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

/**
 * 是否为debug
 */
export const IS_DEBUG = env.NODE_ENV === 'development'

export const PORT = Number(env.PORT || 5000)

export const ROOT_URL = env.ROOT_URL || '/'

export const TIMEOUT = Number(env.TIMEOUT || 5000)