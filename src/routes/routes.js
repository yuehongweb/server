import combineRoutes from 'koa-combine-routers'

import CaptchaRouter from './CaptchaRouter'
import LoginRouter from './LoginRouter'

export default combineRoutes(CaptchaRouter,LoginRouter)
