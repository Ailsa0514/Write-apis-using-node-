
// require models
const User = require("../models/user")
const Car = require("../models/car")
const state = 1;

// 这里写控制器
module.exports = {
    index :async (req,res,next) => {
        const user = await User.find({});
        res.status(200).json({msg:"操作成功",data:user,state:state});
    },
    newUser : async (req,res,next) => {
       const newUser = new User(req.value.body);
       const user = await newUser.save();
        res.status(200).json({msg:"添加成功",data:user,state:state})
    },
    getUser :async (req,res,next) => {
        // New way   配合验证
        const userId = req.value.params.userId;
        // OLD Way
        // const userId = req.params.userId;
        const user = await User.findById(userId)
        res.status(200).json({msg:"查询成功",data:user,state:state})
    },
    replaceUser : async (req,res,next) => {
        const userId = req.value.params.userId;
        const newUser = req.value.body;
        const result= User.findByIdAndUpdate(userId,newUser)
        res.status(200).json({msg:"更新成功",data:result,state:state});
    },
    getUserCars :  async (req,res,next) => {
        const {userId} = req.value.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json({msg:"操作成功",data:user,state:state});
    },
    newUserCars:async (req,res,next) => {
        const {userId} =  req.value.params;
        // Create a new car
        const newCar = new Car(req.value.body);
        // get user
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(200).json({msg:"添加成功",data:newCar,state:state});
    }
};

/**
 * We can interact with mongoose in 3 different ways:
 * 1>Callbacks
 * 2>Promises
 * 3>Async/Await(Promises)
 */