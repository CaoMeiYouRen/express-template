import { HttpError } from '@/models/HttpError'
import { printTime, sleep } from '@/utils'
import express from 'express'
const router = express.Router()

router.get('/error', (req, res, next) => {
    throw new HttpError(500, '服务器出现错误')
})

router.get('/async-error', async (req, res, next) => {
    throw new HttpError(500, '服务器出现异步错误')
})

router.get('/timeout', async (req, res, next) => {
    const time = Number(req.query.time || 10001)
    printTime('开始测试请求超时')
    await sleep(time)
    printTime('结束测试请求超时')
    res.json({ msg: '测试请求超时' })
})

router.all('*', (req, res, next) => {
    throw new HttpError(404, '404 Not Found')
})
export default router
