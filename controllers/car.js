// 引入car models
const Car = require ("../models/car")
const User = require("../models/user")

const state = 1;
module.exports = {
    index : async (req,res,next) => {
        const  car = await Car.find({});
        res.status(200).json({msg:"操作成功",data:car,state:state});
    },
    newCar :async (req,res,next) => {
        // 1 Find the actual seller
        const seller = await User.findById(req.value.body.seller)
        // 2 Create a new car
        const newCar = req.value.body;
        delete newCar.seller

        const car = new Car(newCar);
        await car.save();

        // 3 Add newly created car to the actual seller
        seller.cars.push(car)
        await seller.save();
        res.status(200).json({msg:"添加成功",data:car,state:state})
    },
    getCar: async (req,res,next) => {
        const car = await Car.findById(req.params.carId)
        res.status(200).json({msg:"操作成功",data:car,state:state})
    }

}