const Joi = require('joi');

module.exports = {
    validateParam : (schema,name) => {
        return (req,res,next) => {
            // console.log("req.params.name",req['params'][name]);
            /**
             *  req["params"][name]   => req.params.name
             */
            // const result = Joi.validate({ param: req['params'][name]}, schema, { convert: false})
            const result = Joi.validate({ param:req['params'][name] }, schema)
            // console.log('result',result)
            /** result 的对象
             * 
             *  { 
                    error: null,
                    value: { param: '5c062cb390bdc82788f0673f' },
                    then: [Function: then],
                    catch: [Function: catch] 
                }
             */
            if (result.error) {
                // Error happened
                return res.status(400).json(result.error);
            } else {
                if (!req.value) 
                    req.value = {};
                if(!req.value['params'])
                    req.value['params'] = {};
                // 给req 返回一个对象,格式如下: value: { params: { userId: '5c062cb390bdc82788f0673f' } } }

                // 这样可以在控制器中访问当前的数据   req.value.params
                req.value['params'][name] = result.value.param;

                next();
            }
        }
    },
    // 
    validateBody: (schema) => {
        return (req,res,next) => {
            console.log("req.body",req.body);
            const result = Joi.validate(req.body,schema);
            console.log(result)
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if(!req.value)
                  req.value = {};;
                if(!req.value['body'])
                   req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        }
    },

    // 封装一个对象用来接收参数的验证 
    schemas:{
        userBody:Joi.object().keys({
            userName:Joi.string().required(),
            email: Joi.string().email().required(),
        }),
        carBody:Joi.object().keys({
            make: Joi.string().required(),
            mode: Joi.string().required(),
            year: Joi.number().required(),
        }),
        newCarBody:Joi.object().keys({
            seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            make: Joi.string().required(),
            mode: Joi.string().required(),
            year: Joi.number().required(),
        }),
        idSchema: Joi.object().keys({
            param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
    
}