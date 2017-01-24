var ball, paddle, leftWall, rightWall, topWall, bottomWall;
var bricks; brickWidth = 40; brickHeight = 25; brickSpace = 5; rows=5, cols=15;

function setup() {
  var cnv = createCanvas(800, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  bricks = new Group();

  ball = createSprite(width/2,height-250,10,10);
  ball.shapeColor = color(180);
 ball.velocity.x = random(-7, 7);
 ball.velocity.y = random(-7, 7);

  paddle = createSprite(width/2,height-30,60,10);
  paddle.immovable = true;
  paddle.shapeColor = color(100);

  leftWall = createSprite(0,height/2,20,height);
  leftWall.immovable = true;
  leftWall.shapeColor = color(204, 102, 0);

  rightWall = createSprite(width,height/2,20,height);
  rightWall.immovable = true;
  rightWall.shapeColor = color(204, 102, 0);

  topWall = createSprite(width/2,0,width,20);
  topWall.immovable = true;
  topWall.shapeColor = color(204, 102, 0);

  bottomWall = createSprite(width/2,height+20,width,20);
  bottomWall.immovable = true;
  bottomWall.shapeColor = color(204, 102, 0);

  for(var i = 0; i< cols; i++){
    for(var j = 0; j< rows; j++){
      var n = createSprite(80+(i*(brickWidth+brickSpace)), 80+(j*(brickHeight+brickSpace)), brickWidth, brickHeight);
      n.immovable = true;
      bricks.add(n);
    }
  }
}

function draw() {
  background(50);
  paddle.position.x = constrain(mouseX, (paddle.width - leftWall.width), (width - paddle.width) + rightWall.width);
  ball.bounce(leftWall);
  ball.bounce(rightWall);
  ball.bounce(topWall);
  ball.bounce(paddle);
  if(ball.bounce(bricks, touch)){
    ball.velocity.x += 1;
    ball.velocity.y += 1;
  }
  if(ball.collide(bottomWall)){
     alert("Game Over");
     exit();
   }
  drawSprites();
}

function touch(ball, brick){
  brick.remove();
  ball.shapeColor = brick.shapeColor;
}

function stopFunction(){
  updateSprites(false);
}

function startFunction(){
  if(ball.velocity.x == 0 && ball.velocity.y == 0) {
    ball.setSpeed(10, random(90-10, 90+10));
  } else {
    updateSprites(true);
  }
}

function restart(){
  exit();
  setup();
  draw();
}
