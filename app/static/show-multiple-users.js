import Animate from './Animate.js'

//change to heroku pge later on
const socket = io.connect('http://127.0.0.1:5000')
let connected = false

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let username = "newuser"
var curr_users = []

var position = {x:295, y: 460}

var animate = new Animate(canvas, ctx, username, socket)

socket.on('connect', () => {
    console.log("connecteed here eys");
    //so user only does it once when they connect for the first time
    if(!connected){
        //add to client side users and server side
        curr_users.push({name: username, x:295 , y:460})
        // curr_users.push({name:"fodder", x:320, y:300})
        socket.emit('new-user', "newuser")
        connected = true

        setInterval(draw, 10)
    }

    socket.on('new-user', (user) => {
        console.log("got new user", user.name);
        curr_users.push({name:user.name, x:user.x, y:user.y})

        // animate.drawName(user.coords.x, user.coords.y, user.name)
        // animate.drawSprite(user.coords.x, user.coords.y)
    })

    // socket.on('update-canvas', (users) => {
    //     //whenever any other players move, update thhier positions
    //     for(let user of users){
    //         if(user.name != username){
    //             animate.drawName(user.coords.x, user.coords.y, user.name)
    //             animate.drawSprite(user.coords.x, user.coords.y)
    //         }
    //     }
    // })

})


function draw(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw platforms
    animate.drawPF0();
    animate.drawPF1();
    animate.drawPF2();

    //update position of all users in room
    for(let user of curr_users){
        animate.drawName(user.name, user.x, user.y) 
        animate.drawSprite(user.x, user.y)   
    }
    
    animate.moveX()
    curr_users[0].x = animate.spriteX

    animate.moveY()
    curr_users[0].y = animate.spriteY

}
//add list of alll other clients' positions as well
//the listener should update those positions
//have the draw function update for each person in the list

