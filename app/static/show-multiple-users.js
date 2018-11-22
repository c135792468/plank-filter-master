import Animate from './Animate.js'

//change to heroku pge later on
const socket = io.connect('https://plank-filter-master.herokuapp.com/')
let connected = false

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//add player who just connected
var curr_users = []
// curr_users.push({socketid: socket.id, name: username, x:295 , y:460})

//create class to be able to handle animations
var animate = new Animate(canvas, ctx, socket)


socket.on('connect', () => {
    console.log("connecteed here eys");
    //so user only does it once when they connect for the first time
    if(!connected){
        console.log("cookies:", document.cookie);
        let cookies = document.cookie
        var username = cookies.substring(9, cookies.length-2)
        curr_users.push({socketid: socket.id, name: "", x:295 , y:460})

        //add to client side users and server side
        socket.emit('new-user', cookies)
        connected = true

        setInterval(draw, 10)
    }

    socket.on('get-curr-users', (users) => {
        console.log("got all current users");
        curr_users.push(...users)
    })

    socket.on('new-user', (user) => {
        console.log("got new user", user.name);
        curr_users.push({
            socketid: user.socketid, 
            name:user.name, 
            x:user.x, y:user.y
        })
    })

    socket.on('update-canvas', (user) => {
        //whenever any other players move, update thhier positions
        for(let key of curr_users){
            if(key.socketid == user.socketid){
                key.x = user.x
                key.y = user.y
                break
            }
        }
    })

    socket.on('disconnected', (user) => {
        console.log("user disconnected");
        //remove disconnected user 
        for(let key of curr_users){
            if(key.name == user.name){
                let item = curr_users.indexOf(key)
                curr_users.splice(item, 1)
                break
            }
        }
    })

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

    //update position of user locally
    animate.moveX()
    curr_users[0].x = animate.spriteX

    animate.moveY()
    curr_users[0].y = animate.spriteY

}

export default socket
