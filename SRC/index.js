//đường dẫn vì sử dụng trong folder
const path = require('path');
//gọi thư viện express để dùng các thứ có trong nó
const express = require('express');
// import { engine } from 'express-handlebars';
//morgan được sử dụng để thông báo cho trạng thái của server hiện tại
const morgan = require('morgan');
//handlebars để tải các trang, cấu trúc trang
const { engine } = require('express-handlebars');

// import engine  from 'express-handlebars';
const app = express();
const server =require("http").Server(app);
const io=require("socket.io")(server);
// const handlebars = require('express-handlebars')
const port = 3000;
const methodOverride = require('method-override');
const { Socket } = require('socket.io');
app.use(express.static(path.join(__dirname, 'Resouses/public')));

//gọi ra để sử dụng
app.use(morgan('combined'));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers:{
      sum: (a,b) => a+b,
    }
  }),
);
app.use(methodOverride('_method'))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'Resouses','views'));
//sửa link đường dẫn mặc định thành link đường dẫn hợp lệ
//render đến các trang đó thông qua đường dẫn

io.on("connection",function(socket) {
 // console.log("có người kết nối"+socket.id);
  socket.on("client",function(data){
    console.log(socket.id +": "+ data);
  })
})
app.get('/',(req,res)=>{
  res.render('home');
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

