import send from "@/config/emailConfig";
import moment from "moment";
class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    const result = await send({
      code: "1234",
      expire: moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss"),
      email: body.username,
      user: "王一博455545",
    });
    ctx.body = {
      code: 200,
      data: result,
    };
  }

  async login(ctx){
    // 获取登录的信息
    // 验证验证码的有效性和正确性
    // 验证用户名和密码是否正确
    // 返回token
    console.log(ctx.request.body)
  }
}

export default new LoginController();
