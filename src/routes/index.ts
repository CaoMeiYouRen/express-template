import express from 'express'
const router = express.Router()

router.get('*', (req, res, next) => {
    res.json({ msg: 'hello world' })
})
export default router