var balloon, balloonImg, bg;

var database, balloonpos, pos;
function preload() {
  bg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
  balloonImg = loadImage("pro-C35 images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(800, 400);

  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage("balloon", balloonImg);
  balloon.scale = 0.5;

  database.ref("balloon/position").on("value", (data) => {
    pos = data.val();
    balloon.x = pos.x;
    balloon.y = pos.y;
  });
}

function draw() {
  background(bg);

  movement();

  drawSprites();
}

function movement() {
  if (keyDown(LEFT_ARROW)) {
    balloon.x = balloon.x - 10;
    setPos(-10, 0);
  }
  if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x + 10;
    setPos(10, 0);
  }
  if (keyDown(UP_ARROW)) {
    balloon.y = balloon.y - 10;
    balloon.scale = balloon.scale - 0.02;
    setPos(0, -10);
  }
  if (keyDown(DOWN_ARROW)) {
    balloon.y = balloon.y + 10;
    balloon.scale = balloon.scale + 0.02;
    setPos(0, 10);
  }
}

function setPos(x, y) {
  database.ref("balloon/position").set({
    x: balloon.x + x,
    y: balloon.y + y,
  });
}

function ShowError() {
  console.log("Error in database");
}
