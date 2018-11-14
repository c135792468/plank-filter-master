var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gravity = 3;
var jumpForce = 2;
var moveLeft = 2;
var moveRight = -2;
var leftPressed = false;
var rightPressed = false;
var isLanded = false;
var ballRadius = 10;
var spriteX = (canvas.width-ballRadius)/2;
var spriteY = 460;
var userName = "Username"
var score = 0;



//listen for key down button press
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keydown", upKeyHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) { 
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function upKeyHandler(a) {
    if(a.keyCode == 38 && isLanded && spriteY > 10) {
        jumpForce = -4;
        isLanded = false;
    }
}
function keyUpHandler(i) {
    if(i.keyCode == 39) {
        rightPressed = false;
    }
    if(i.keyCode == 37) {
        leftPressed = false;
    }
}
function drawName() {
    ctx.font = "12px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(userName, spriteX-10, spriteY-15);
}
function drawPressed() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Pressed: "+leftPressed+" "+rightPressed, 8, 20);
}
function drawJumpForce() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("JumpData: "+jumpForce, 8, 40);
}
function drawLanded() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Landed: "+isLanded, 8, 60);
}
function drawSprite() {
    ctx.beginPath();
    ctx.arc(spriteX, spriteY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//Level Design
function drawPF0() {
    ctx.beginPath();
    ctx.rect(390, 460, 30, 5);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPF1() {
    ctx.beginPath();
    ctx.rect(450, 400, 80, 5);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPF2() {
    ctx.beginPath();
    ctx.rect(300, 350, 80, 5);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPressed();
    drawJumpForce();
    drawLanded();
    drawSprite();
    drawName();
    drawPF0();
    drawPF1();
    drawPF2();
    //Gravity on / Gravity off
    if(isLanded){
        gravity = 0;
    } else if (spriteY <= canvas.height-ballRadius) {
        gravity = 3;
    } else {
        gravity = 0;
    }
    //Sprite Y Axis movement + Object collision
    if(spriteY > 0){
        if(jumpForce < 0) {
            spriteY += jumpForce;
            jumpForce += 0.1;
        } else if (jumpForce > 0 && jumpForce < 2) {
            spriteY += jumpForce;
            jumpForce += 0.1;
        } else if (spriteY < canvas.height-ballRadius) {
            //Object Collision Data here
            if (spriteY >= 450 && spriteY <= 455) {
                if(spriteX >= 390 && spriteX <= 420){
                    spriteY = 450;
                    isLanded = true;
                } else {
                    isLanded = false;
                }
            } 
            if(spriteY >= 390 && spriteY <= 395){
                if(spriteX >= 450 && spriteX <= 530){
                    spriteY = 390;
                    isLanded = true;
                } else {
                    isLanded = false;
                }
            }
            if(spriteY >= 340 && spriteY <= 345){
                if(spriteX >= 300 && spriteX <= 380){
                    spriteY = 340;
                    isLanded = true;
                } else {
                    isLanded = false;
                }
            }
            //Gravity
            spriteY += gravity;
        } else {
            isLanded = true;
        }
    } else {
        jumpForce = 2;
        spriteY += gravity;
    }
    //Sprite X Axis movement
    if(spriteX >= 0+ballRadius && spriteX <= canvas.width-ballRadius){
        if(rightPressed == true) {
            spriteX -= moveRight;
        } else if(leftPressed == true) {
            spriteX -= moveLeft;
        }
    } else if (spriteX >= canvas.width-ballRadius) {
        spriteX -= moveLeft;
    } else if (spriteX <= 0+ballRadius) {
        spriteX -= moveRight;
    }
}
setInterval(draw, 10);