const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

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
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


require('./config/passport')(passport);

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