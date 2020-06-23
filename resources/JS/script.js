class Paddle {
    constructor(gameWidth, gameHeight){
        this.width = 150;
        this.height

        this.position = {
            x: gameWidth/2 - this.width/2,
            y: gameHeight - this.height -10,
        }
    }

    draw(context) {
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d'); //rendering context to draw into the canvas

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

context.clearRect(0,0,800,600) //from start to the entire game screen

let paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT) 

paddle.draw(context)