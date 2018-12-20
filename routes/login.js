const express = require('express');
const router = express.Router();

// 引入controllers
const UserController = require("../controllers/login")
// 引入验证
const { validateParam,validateBody, schemas } = require("../helpers/routeHelpers");

router.route('/')
    .post(validateBody(schemas.userBody),UserController.index)


module.exports = router;
