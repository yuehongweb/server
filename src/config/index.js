
// mongodb基础配置
const DB_URL = 'mongodb://root:Yh921128@192.168.25.128:27017/admin';

// redis基础配置
const REDIS = {
  host: '192.168.25.128',
  port: 15001,
  password: '123456',
};

// jwt 检验密码  网上很多--随机密码生成
const JWT_SECRET ='T*GhYJWZ&6yl8BNNkOC*QM&n5O58iernx!DyqTgA0U%oZPUl'
export default {
  DB_URL,
  REDIS,
  JWT_SECRET
};
