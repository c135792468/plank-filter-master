
class Animate{
    constructor(canvas, context, username){
        this.canvas = canvas
        this.username = username

        this.leftPressed = false
        this.rightPressed = false
        this.jumpForce = 2
        this.isLanded = false
        this.gravity = 2

        this.moveLeft = 2;
        this.moveRight = -2;

        this.ballRadius = 10;
        this.spriteX = (canvas.width-this.ballRadius)/2;
        this.spriteY = 460;

        this.ctx = context

        this.keyDownHandler = this.keyDownHandler.bind(this)
        this.upKeyHandler = this.upKeyHandler.bind(this)
        this.keyUpHandler = this.keyUpHandler.bind(this)
        this.draw = this.draw.bind(this)

        this.createEventListeners()
    }

    createEventListeners(){
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keydown", this.upKeyHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
    }

    keyDownHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = true;
        }
        if(e.keyCode == 37) {
            this.leftPressed = true;
        }
    }
    
    upKeyHandler(a) {
        if(a.keyCode == 38 && this.isLanded && this.spriteY > 10) {
            this.jumpForce = -4;
            this.isLanded = false;
        }
    }
    
    keyUpHandler(i){
        if(i.keyCode == 39) {
            this.rightPressed = false;
        }
        if(i.keyCode == 37) {
            this.leftPressed = false;
        }
    }
    drawName() {
        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText(this.username, this.spriteX-10, this.spriteY-15);
    }

    drawPressed() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Pressed: "+ this.leftPressed+" "+ this.rightPressed, 8, 20);
    }

    drawJumpForce() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("JumpData: "+ this.jumpForce, 8, 40);
    }

    drawLanded() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Landed: "+ this.isLanded, 8, 60);
    }
    
    drawSprite() {
        this.ctx.beginPath();
        this.ctx.arc(this.spriteX, this.spriteY, this.ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPF0() {
        this.ctx.beginPath();
        this.ctx.rect(390, 460, 30, 5);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPF1() {
        this.ctx.beginPath();
        this.ctx.rect(450, 400, 80, 5);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPF2() {
        this.ctx.beginPath();
        this.ctx.rect(300, 350, 80, 5);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPressed();
        this.drawJumpForce();
        this.drawLanded();
        this.drawSprite();
        this.drawName();
        this.drawPF0();
        this.drawPF1();
        this.drawPF2();
        //Gravity on / Gravity off
        if(this.isLanded){
            this.gravity = 0;
        } else if (this.spriteY <= this.canvas.height-this.ballRadius) {
            this.gravity = 3;
        } else {
            this.gravity = 0;
        }
        //Sprite Y Axis movement + Object collision
        if(this.spriteY > 0){
            if(this.jumpForce < 0) {
                this.spriteY += this.jumpForce;
                this.jumpForce += 0.1;
            } else if (this.jumpForce > 0 && this.jumpForce < 2) {
                this.spriteY += this.jumpForce;
                this.jumpForce += 0.1;
            } else if (this.spriteY < this.canvas.height-this.ballRadius) {
                //Object Collision Data here
                if (this.spriteY >= 450 && this.spriteY <= 455) {
                    if(this.spriteX >= 390 && this.spriteX <= 420){
                        this.spriteY = 450;
                        this.isLanded = true;
                    } else {
                        this.isLanded = false;
                    }
                } 
                if(this.spriteY >= 390 && this.spriteY <= 395){
                    if(this.spriteX >= 450 && this.spriteX <= 530){
                        this.spriteY = 390;
                        this.isLanded = true;
                    } else {
                        this.isLanded = false;
                    }
                }
                if(this.spriteY >= 340 && this.spriteY <= 345){
                    if(this.spriteX >= 300 && this.spriteX <= 380){
                        this.spriteY = 340;
                        this.isLanded = true;
                    } else {
                        this.isLanded = false;
                    }
                }
                //Gravity
                this.spriteY += this.gravity;
            } else {
                this.isLanded = true;
            }
        } else {
            this.jumpForce = 2;
            this.spriteY += this.gravity;
        }
        //Sprite X Axis movement
        if(this.spriteX >= this.ballRadius && this.spriteX <= this.canvas.width-this.ballRadius){
            if(this.rightPressed == true) {
                this.spriteX -= this.moveRight;
            } else if(this.leftPressed == true) {
                this.spriteX -= this.moveLeft;
            }
        } else if (this.spriteX >= this.canvas.width-this.ballRadius) {
            this.spriteX -= this.moveLeft;
        } else if (this.spriteX <= this.ballRadius) {
            this.spriteX -= this.moveRight;
        }
    }


}

export default Animate