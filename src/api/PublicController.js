import svgCaptcha from 'svg-captcha';
import { setValue, getValue } from '@/config/RedisConfig';
class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const body = ctx.request.query;
    console.log(body.uuid, 'query');
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 3,
      color: true,
      background: '#f2f2f2',
      height: 35,
    });
    // 设置验证码过期时间为10分钟
    setValue(body.uuid, captcha.text, 10 * 60);
    ctx.body = {
      code: 200,
      data: captcha.data,
    };
  }
}

export default new PublicController();
