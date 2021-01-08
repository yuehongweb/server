const svgCaptcha = require('svg-captcha')

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const captcha = svgCaptcha.create({
      size:4,
      ignoreChars:'0o1i',
      noise:3,
      color:true ,
      background:'#f2f2f2',
      height:35
    });
    ctx.body = {
      code:200,
      data: captcha.data
    }
  }
}

export default new PublicController()
