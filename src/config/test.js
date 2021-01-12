import { getValue, setValue,getHValue } from "./RedisConfig";

setValue("YIBO", "yibo ni hao");

getValue("YIBO").then((res) => {
  console.log(res);
});

setValue('YIBOOBJECT',{name:'yb',age:23})
getHValue('YIBOOBJECT').then(res=>{
    console.log('YIBO'+JSON.stringify(res, null, 2));
})
