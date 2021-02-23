import send from '@/config/emailConfig';
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import config from '@/config';
import { checkCode } from '@/utils/index.js';
import User from '../model/test';
import bcrypt from 'bcrypt'
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
    let result = await checkCode(sid, code);
    if (result) {
      // 验证用户名和密码是否正确
      let checkPassword = false;
      let user = await User.findOne({ username: body.username });
      // if (user&&(user.password === body.password)) {
      if (await bcrypt.compare(body.password,user.password)) {
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
      } else {
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

  async reg(ctx) {
    // 接收客户端数据
    const { username, nickname, password, code, sid } = ctx.request.body;
    let msg = {};
    // 验证码正确
    let result = await checkCode(sid, code);
    if (!result) {
      msg.code = ['验证码不正确'];
      ctx.body = {
        code: 500,
        msg
      };
      return;
    }
    // 校验邮箱是否被注册
    let user1 = await User.findOne({ username });
    let passFlag = true;
    if (user1 && typeof user1.username !== 'undefined') {
      msg.username = ['此邮箱已经注册，可以通过邮箱找回密码'];
      passFlag = false;
    }
    // 校验nickname是否被注册
    let user2 = await User.findOne({ nickname: nickname });
    if (user2 && typeof user2.nickname !== 'undefined') {
      msg.nickname = ['此昵称已经注册，请修改'];
      passFlag = false;
    }

    // 邮箱和昵称都没有被注册才可以将数据写入到数据库
    // 写入数据到用户表
    if (passFlag) {
      let hashPassword = await bcrypt.hash(password,5)
      const data = new User({ username, nickname, password:hashPassword });
      const result = await data.save();
      ctx.body = {
        code: 200,
        data: result,
      };
      return;
    }
    ctx.body = {
      code: 500,
      msg
    };
  }
}

export default new LoginController();
