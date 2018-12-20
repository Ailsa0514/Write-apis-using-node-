

const User = require("../models/user");

const state = 1;

module.exports = {
    index : async (req,res,next) => {
        const {userName ,email} = req.value.body
        const user = await User.findOne({"userName":userName,"email":email})
        if(user==null){
          return res.status(200).json({msg:"未查询到用户信息",data:user,state:state})
        }
        res.status(200).json({msg:"登录成功",data:user,state:state})
    }
}