var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

//ball
var radius = 8;
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var dirX=3;
var dirY=3;

//paddle
var paddleWidth = 80;
var paddleHeight = 15;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = canvas.height-paddleHeight;

//bricks
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var randRow=Math.floor(Math.random() *(7-3) +3);
var randCol=Math.floor(Math.random() *(12-7) +7);
var numRow = randRow;
var numCol = randCol;
var totalBricks = numRow*numCol;
var bricks = [];
var brickRight = (canvas.width - (numCol*(brickPadding+brickWidth)))/2; 
var brickTop = 20;
var colors=["blue","lime","violet","brown","turquoise"];
var randColor=Math.floor(Math.random() * 5);

for(var c = 0; c < numCol; c++){
	bricks[c] = [];
	for(var r = 0; r < numRow; r++){
		bricks[c][r] = {x:0, y:0, visible:true}		
	}
}

function drawBall(x,y){
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI)
	ctx.fillStyle="black";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle="red";
	ctx.fill();
	ctx.closePath();
}

function drawBricks(level){
	for(var c = 0; c < numCol; c++){
		for(var r = 0; r < numRow; r++){
			if(bricks[c][r].visible){
				bricks[c][r].x = (c*(brickWidth+10)+brickRight);
				bricks[c][r].y = (r*(brickHeight+brickTop)+brickTop);
				ctx.beginPath();
				ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
				//array of colors, random number to generate color
				ctx.fillStyle = colors[randColor];
				ctx.fill();
				ctx.strokeStyle = 'black';
				ctx.stroke();
				ctx.closePath();
			}	
	  }
  }
}

function brickCollision(){	
	for(var c = 0; c < numCol; c++){
		for(var r = 0; r < numRow; r++){
			if(bricks[c][r].visible){
				if(ballX +radius> bricks[c][r].x && ballX -radius< bricks[c][r].x+brickWidth && ballY +radius> bricks[c][r].y && ballY -radius< bricks[c][r].y+brickHeight){
					dirY =-dirY;
					bricks[c][r].visible = false;
					totalBricks--;
					if(totalBricks==0){
						setTimeout(location.reload(), 4000);
					}
				}
			}
		}
	}	
}

function wallCollision(){
    if(ballX + 2 > canvas.width-radius || ballX + 2 < 10) {
        dirX = -dirX;
    }
	if(ballY < 10){
		dirY =-dirY;
	}
	else if(ballY >= canvas.height){
		//reset ball and paddle
		setTimeout(location.reload(), 6000);
	}
}


function paddleColission(){
	if (ballX < paddleX + paddleWidth && ballX > paddleX && ballY > paddleY && ballY < paddleY + paddleHeight) {
		dirY =-dirY;
	}
}

function mouseMoveHandler(e) {
	var userX = e.clientX;  
	if(userX > 0 && userX < canvas.width){
		paddleX = userX - paddleWidth/2;
	}
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall(ballX, ballY);
	drawPaddle();
	drawBricks();
	paddleColission();
	wallCollision();
	brickCollision();
	ballX+=dirX;
	ballY+=dirY;
	requestAnimationFrame(draw);
}

document.addEventListener("mousemove", mouseMoveHandler, false);
draw();