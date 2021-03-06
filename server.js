const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');  
// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true,useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// passport 初始化
app.use(passport.initialize());


//设置跨域访问
// app.all('*', (req, res, next) => {

//   // TODO 支持跨域访问
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token,Authorization");
//   res.setHeader("Access-Control-Expose-Headers", "*");

//   if (req.getMethod().equals("OPTIONS")) {
//       HttpUtil.setResponse(res, HttpStatus.OK.value(), null);
//       return;
//   }

//   next();
// });

require('./config/passport')(passport);


app.use(express.static('public'))

app.get("/",(req,res) => {
  res.send("Hi Cyan!");
})





// 使用routes
app.use('/api/users', users);
app.use('/api/profile', profiles);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});