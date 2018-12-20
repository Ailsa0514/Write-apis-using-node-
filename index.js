// 引入主要的库
const express = require('express')
const logger = require('morgan');


// 创建代理地址
// const proxyMiddleware = require('http-proxy-middleware');
// import mongoose data
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

// 连接数据库
mongoose.connect('mongodb://localhost/a_data');

// 监听数据库
// mongoose.connection.once('open',()=>{
//     console.log("数据连接成功");
// })
// 实例化express
const app = express();

// Middlewares    

app.use(logger('dev'));
app.use(bodyParser.json());

// import Routes
const user = require('./routes/user');
const car = require('./routes/car');
const login = require('./routes/login');

// use Routes
app.use('/user',user);
app.use('/car',car);
app.use('/login',login);

// Catch 404 Errors and forward them to error handler
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status =  404;
    next(err);
})

// Error handler function
app.use((err,req,res,next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // Response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })

    //  Response to ourselves
    console.error(err);
})

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// Start the server

const port = app.get('port') || 3000;
app.listen(port,() => console.log(`Server is listening on port ${port}`))
