import express from 'express'
import { HttpError } from '@/models/HttpError'
import { HttpStatusCode } from '@/models/HttpStatusCode'
import { ResponseDto } from '@/models/ResponseDto'
import { IS_DEBUG } from '@/config'

export function catchError(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    let message: any = 'Unknown Error'
    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
    if (err instanceof HttpError) {
        message = err.message
        statusCode = err.statusCode
    } else if (err instanceof Error) {
        // 开发阶段打印堆栈信息，否则打印 message
        message = IS_DEBUG ? err.stack : err.message
    }
    res.status(statusCode)
    res.json(new ResponseDto({
        statusCode,
        message
    }))
}