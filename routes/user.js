const express = require('express');
const router = express.Router();

// 引入controllers
const UserController = require("../controllers/user")
// 引入验证
const { validateParam,validateBody, schemas } = require("../helpers/routeHelpers");

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userBody),UserController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema,'userId'),UserController.getUser)
    .put([validateParam(schemas.idSchema,'userId'),
          validateBody(schemas.userBody)],
         UserController.replaceUser);

router.route('/:userId/car')
    .get(validateParam(schemas.idSchema,'userId'),UserController.getUserCars)
    .post([validateParam(schemas.idSchema,'userId'),
            validateBody(schemas.carBody)],
          UserController.newUserCars)


module.exports = router;
