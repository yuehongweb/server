
import { getValue } from '@/config/RedisConfig';

/**
 * 判断验证码是否正确
 * @param {strign} sid 
 * @param {string} value 
 * @return {Boolean} true通过 false 不通过
 */
const checkCode =async (sid,value)=>{
    if(sid){
        let data = await getValue(sid);
        // 验证码正确
        if (data&&(data.toLowerCase() === value.toLowerCase())) {
            return true
        }
        return false
    }else{
        return false
    }
    
}
export {
    checkCode
}