import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import 'express-async-errors' // 捕获异步异常
import router from './routes'
import { ROOT_URL } from './config'
import './db'
import './services'
import { catchError, fileLogger, consoleLogger, handleTimeout, limiter } from './middleware'
export class Server {
    /**
     * expressd的app对象
     *
     * @type {express.Application}
     * @memberof Server
     */
    public readonly app: express.Application
    constructor() {
        this.app = express()
        this.config()
    }
    /**
     *配置
     *
     * @author CaoMeiYouRen
     * @date 2019-08-20
     * @private
     * @memberof Server
     */
    private config(): void {
        this.app.set('trust proxy', (ip: string) => true)
        this.app.use(consoleLogger)
        this.app.use(fileLogger)
        this.app.use(compression())
        this.app.use(handleTimeout)
        this.app.use(limiter)
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.text())
        this.app.use(bodyParser.raw())

        this.routes()

        this.app.use(catchError)
    }
    /**
     * 路由
     *
     * @author CaoMeiYouRen
     * @date 2019-08-20
     * @private
     * @memberof Server
     */
    private routes(): void {
        this.app.use(ROOT_URL, router)
    }
}
