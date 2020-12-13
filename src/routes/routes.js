import combineRoutes from 'koa-combine-routers'

import CaptchaRouter from './CaptchaRouter'

export default combineRoutes(CaptchaRouter)
