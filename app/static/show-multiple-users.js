import Animate from './Animate'

//change to heroku pge later on
let socket = io.connect('http://127.0.0.1:5000')
let connected = false

let position = {x: 0, y:0}

let canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let animate = Animate(canvas, ctx, "newuser")

socket.on('connect', (socket) => {
    //so user only does it once when they connect for the first time
    if(!connected){
        socket.emit('new-user', "newuser")
    }
    
    socket.on('new-user', (users) => {
        
    })
})

setInterval(animate.draw, 10)