
//board;
var blocksize=25;
var rows=30;
var cols=30;
var board;
var context;

//snake head
var snakeX = blocksize * 5; //we multiply everything with blocksize to make sure it fills the square;
var snakeY = blocksize * 5; // snake starts at (5,5)

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;//= blocksize * 10;
var foodY;// = blocksize * 10; //starts at (10,10)
//no need of initializing food location as it is done randomly by placefood fn

var gameOver = false;

window.onload =function(){
    board = document.getElementById("board"); //accessing board created in html
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d") //used for drawing on the board

    placefood();
    document.addEventListener("keyup", changeDirection);
    //keyup is going to wait for us to press any arrow key
    //listens for a keyup and calls fn changeDirection;
    update();//this is going to update the board on html
    setInterval(update, 1000/10);//this function runs the update fn every 100ms;
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle="black";//this changes the colour of pen to black;
    context.fillRect(0 , 0 , board.width, board.height);//starting from the corner of the canvas with fill the board 500px x 500px;

    context.fillStyle="red";//color of food;
    context.fillRect(foodX , foodY , blocksize , blocksize);

    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX, foodY]);//grows the segment where the food was;
        placefood();
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }//we start from the tail and before we update (x,y) we want the tail to get prev (x,y)
    //as in the entire snake body bit moves to the prev bit(next bit in snake length) except the head; 
    // no after completion of loop the second segment is at head;
    //24th of video;

    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }//if the snake has a body(apart fromt head) we make the second bit same as head;


    context.fillStyle="lime";//color of snake;
    snakeX += velocityX * blocksize; //reflecting change in direction by painting on canvas;
    snakeY += velocityY * blocksize; //doing that by constantly changeing x,y which we do by update fn;
    //we my by blocksize as snake was moving 1px at a time and that was slow;
    context.fillRect(snakeX , snakeY, blocksize , blocksize); //(x,y,width,height)
    for(let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }//draws all the body segments (shattered, not moving along head)

    //game over conditions
    if(snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize){
        gameOver = true;
        alert("Game Over");
    }

    for(i=0;i<snakeBody.length;i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }


}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}//changes direction of the snake;//putting && so that snake doesnt go opposite and eat its body;

function placefood(){
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
    //math.random returns a num between (0,1) so foodX and foodY will be within range;
}