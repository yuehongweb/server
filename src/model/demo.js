import User from "./test";

// 增
const user = {
  name: "YIBO",
  age: 23,
  email: "YIBO@163.com",
};

const insertMethod = async () => {
    const data = new User(user);
    const result = await data.save();
    console.log(result);
  };

// 查
const searchMethod = async () => {
    const result = await User.find();
    console.log(result);
  };
//   searchMethod()
// 改
const updateMethod = async () => {
    const result = await User.updateOne({name: 'YIBO'},{
        email: 'yh@163.com'
    });
    console.log(result);
  };
//   updateMethod()
// 删
const deleteMethod = async () => {
    const result = await User.deleteOne({name: 'YIBO'});
    console.log(result);
  };
  deleteMethod()

