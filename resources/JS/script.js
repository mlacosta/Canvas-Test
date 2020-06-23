class Paddle {
    constructor(gameWidth, gameHeight){
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: gameWidth/2 - this.width/2,
            y: gameHeight - this.height -10,
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#5bf';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

    update(dt){
        //dt = delta time
        if(!dt) return;
        this.position.x += this.speed;
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
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
                    alert('move right');
                    break;
            }
        })
    }
}

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d'); //rendering context to draw into the canvas

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


let paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT) 

let lastTime = 0;

const gameLoop = (timeStamp)=>{
    let dt = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0,0,800,600) //from start to the entire game screen
    paddle.update(dt);
    paddle.draw(context);

    requestAnimationFrame(gameLoop)
    
}
new InputHandler(paddle);
gameLoop()