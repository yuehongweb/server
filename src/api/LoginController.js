import send from '@/config/emailConfig';
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import config from '@/config';
import { checkCode } from '@/utils/index.js';
import User from '../model/test';
// import ErrorHandle from '@/common/ErrorHandle'

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    const result = await send({
      code: '1234',
      expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      email: body.username,
      user: '王一博455545',
    });
    ctx.body = {
      code: 200,
      data: result,
    };
  }

  async login(ctx) {
    // 判断图形验证码是否正确
    const { body } = ctx.request;
    let sid = body.sid;
    let code = body.code;
    // 验证码正确
    let result = await checkCode(sid, code)
    if (result) {
      // 验证用户名和密码是否正确
      let checkPassword = false;
      let user = await User.findOne({username:body.username});
      // if (user&&(user.password === body.password)) {
      if (user.password === body.password) {
        checkPassword = true;
      }
      if (checkPassword) {
        let token = jsonwebtoken.sign({ _id: 'WANGYIBO' }, config.JWT_SECRET, {
          expiresIn: '1d',
        });
        ctx.body = {
          code: 200,
          token: token,
        };
      }else{
        // 用户名或者密码不正确
        ctx.body = {
          code: 404,
          msg: '用户名或密码不正确',
        };
      }
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 401,
        msg: '验证码不正确',
      };
    }
  }
}

export default new LoginController();
