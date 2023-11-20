var socket=io("http://localhost:3000");
var btn=document.querySelector("#hello");
var text=document.querySelector("#text");
btn.onclick=function(){
  socket.emit("client",text.value);
}
