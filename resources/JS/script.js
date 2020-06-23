class Paddle {
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: game.gameWidth /2 - this.width/2,
            y: game.gameHeight  - this.height -10,
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#5bf';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

    update(dt){
        //dt = delta time
        this.position.x += this.speed;
        if (this.position.x < 0) this.position.x = 0;
        if ((this.position.x + this.width) > this.gameWidth) this.position.x = this.gameWidth-this.width;
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = +this.maxSpeed;
    }

    stop(){
        this.speed = 0;
    }
}

class InputHandler {
    constructor(paddle){
        document.addEventListener('keydown', (event)=>{

            switch(event.keyCode){
                case 37:
                    paddle.moveLeft();
                    break;
                case 39:
                    paddle.moveRight();
            }
        })

        document.addEventListener('keyup', (event)=>{

            switch(event.keyCode){
                case 37:
                    if(paddle.speed < 0){
                        paddle.stop();
                    }
                    break;
                case 39:
                    if(paddle.speed > 0){
                        paddle.stop();
                    }
                    break;
            }
        })
    }
}

class Ball {
    constructor (game){
        this.image = document.getElementById('img-ball');
        this.speed = {x:4,y:4};
        this.position = {x:10,y:10};
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size);
    }

    update(dt) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //collisions

        if(this.position.x + this.size > this.gameWidth || this.position.x <0){
            this.speed.x = -this.speed.x;
        }
        
        if(this.position.y + this.size> this.gameHeight || this.position.y <0){
            this.speed.y = -this.speed.y;
        }

    }
}

class Game{
    constructor(gameHeight,gameWidth){
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth
    }

    start(){
        this.paddle = new Paddle(this); 
        this.ball = new Ball(this); 
        new InputHandler(this.paddle);
    }

    update(dt){
        this.paddle.update(dt);
        this.ball.update(dt)
    }

    draw(context){
        this.paddle.draw(context);
        this.ball.draw(context);
    }

}

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d'); //rendering context to draw into the canvas


const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


let game = new Game(GAME_HEIGHT,GAME_WIDTH);
game.start()

let lastTime = 0;

const gameLoop = (timeStamp)=>{
    let dt = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT) //from start to the entire game screen
    game.update(dt);
    game.draw(context);

    requestAnimationFrame(gameLoop)
    
}

requestAnimationFrame(gameLoop);