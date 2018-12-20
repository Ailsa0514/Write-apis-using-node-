const express = require('express');
const router = express.Router();

// 引入controllers
const carController = require("../controllers/car")
// 引入验证
const { validateParam,validateBody, schemas } = require("../helpers/routeHelpers");



router.route('/')
    .get(carController.index)
    .post(validateBody(schemas.newCarBody),carController.newCar);

router.route('/:carId')
    .get(validateParam(schemas.idSchema,'carId'),carController.getCar)

module.exports = router;