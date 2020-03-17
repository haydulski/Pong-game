/*canvas*/
const canvas = document.querySelector('canvas');
/*adding graphic context of canvas to variable ctx*/
const ctx = canvas.getContext('2d');

/*canvas size*/
canvas.width = 1000;
canvas.height = 500;

/*width and heigth added to variables*/
const cw = canvas.width;
const ch = canvas.height;
//sounds
const po1 = new Audio('pong1.mp3')
const po2 = new Audio('pong2.wav')
const po3 = new Audio('pong3.wav')
po1.play();


const ballSize = 20;
//ball start position in middle of canvas
let ballX = cw / 2 - ballSize / 2
let ballY = ch / 2 - ballSize / 2

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = -4;
let ballSpeedY = 4;

//player paddle position
function player() {
    ctx.fillStyle = '#7FFF00'; //kolor
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}

//ai paddle
function ai() {
    ctx.fillStyle = 'red';
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
}

function ball() {
    //ball position and ball shape
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    //change of ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize > ch) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX <= 0 || ballX + ballSize > cw) {
        po1.pause();
        ballX = cw / 2 - ballSize / 2
        ballY = ch / 2 - ballSize / 2
        ballSpeedX = (Math.floor(6 - Math.random() * 4)) * -1;
        ballSpeedY = Math.floor(6 - Math.random() * 4);
        console.log(ballSpeedX);
        po1.currentTime = 0
        po1.play();

    }
    //colision with ai
    if (ballX - ballSize <= aiX && ballX >= aiX - paddelWidth) {
        if (ballY <= aiY + paddelHeight && ballY + ballSize >= aiY) {
            ballX = aiX - ballSize;
            ballSpeedX = -ballSpeedX;
            ballSpeedY = -ballSpeedY * -1;
            po2.play();
        }

    }

    //colision with player
    if (ballX - ballSize <= playerX && ballX >= playerX - paddelWidth) {

        if (ballY <= playerY + paddelHeight && ballY + ballSize >= playerY) {
            ballSpeedX = -ballSpeedX;
            if (ballSpeedX <= 12 && ballSpeedX > 0 || ballSpeedX >= -14 && ballSpeedX < 0) {
                ballSpeedX *= 1.2;
                ballSpeedY *= 1.2;

            }
            po3.play();

        }

    }
}



function table() {
    //table color nd size
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    //middle line
    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "gray"
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
    }
}

let canFromTop = canvas.offsetTop

function paddelChange(e) {
    playerY = e.clientY - canFromTop - (paddelHeight / 2)
    if (playerY < 0) playerY = 0
    if (playerY > ch - paddelHeight) playerY = ch - paddelHeight
}
canvas.addEventListener('mousemove', paddelChange)

// ai logic
let midPadd = paddelHeight + aiY;
let midBall = ballY + ballSize / 2;

function aiPosition() {
    midPadd = paddelHeight + aiY;
    midBall = ballY + ballSize / 2;
    if (ballX > 500) {
        if (midPadd - midBall > 400) {
            aiY -= 30
        } else if (midPadd - midBall > 20) {
            aiY -= 20
        } else if (midPadd - midBall < -400) {
            aiY += 30
        } else if (midPadd - midBall < -10) {
            aiY += 20
        }
    } else if (ballX < 490 && ballX > 150) {
        if (midPadd - midBall > 100) {
            aiY -= 2

        } else if (midPadd - midBall < -100) {
            aiY += 2
        }
    }
    if (aiY >= ch - paddelHeight) {
        aiY = ch - paddelHeight
    }
    if (aiY < 1) {
        aiY = 0;
    }

}


/* main function */
function game() {
    table()
    ball()
    player()
    ai()
    aiPosition()

}

//setInterval switching main function every 20 msc
setInterval(game, 20)