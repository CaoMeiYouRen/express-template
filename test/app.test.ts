import http from 'http'
import request from 'supertest'
import should from 'should'
import { Server } from '../src/app'
import { PORT } from '../src/config'
const app = new Server().app
let server: http.Server
describe('app e2e测试', () => {
    before(done => {
        server = app.listen(PORT, () => {
            console.log(`测试服务器已启动：http://127.0.0.1:${PORT}`)
            done()
        })
    })
    after(done => {
        server.close(err => {
            if (err) {
                done(err)
                return
            }
            done()
        })
    })
    it('根路由，应该成功200', done => {
        request(server).get('/').expect(200, (err, res) => {
            if (err) {
                done(err)
                return
            }
            should(res.status === 200).ok()
            done()
        })
    })
})