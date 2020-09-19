//Create variables here
var Dog;
var dogImg;
var happyDog;
var bowl;
var bowlImg;
var foodStock;
var foods;
var database;
var bar;
var pour;
var pourImg;
var bottle;
var b1;
var b2;
var main;
var mainImg;
var start;
var startImg;
var currentDate;
var currentTime;
var milk = 20;
var gameOver;
var gameOverImg;
var w;
var windowImg;

var gameState = "main";

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  bowlImg = loadImage("bowl.png");
  pourImg = loadImage("pour.png");
  b1 = loadImage("b1.png");
  b2 = loadImage("b2.png");
  mainImg = loadImage("main.png");
  startImg = loadImage("start.png");
  gameOverImg = loadImage("img5.jpg");
  windowImg = loadImage("w.jpg");
}

function setup() {
  createCanvas(800, 800);
  
  Dog = createSprite(430,555,20,20);
  Dog.addImage(dogImg);
  Dog.scale = 0.33;

  bowl = createSprite(340,630,20,20);
  bowl.addImage(bowlImg);
  bowl.scale = 0.2;

  bottle = createSprite(240,475,20,20);
  bottle.addImage(b1);
  bottle.scale = 0.5;

  w = createSprite(400,240,80,80);
  w.addImage(windowImg);
  w.scale = 1;

  pour = createSprite(310,555,20,20);
  pour.addImage(pourImg);
  pour.scale = 0.5;
  pour.visible = false;

  main = createSprite(400,400,800,800);
  main.addImage(mainImg);
  main.visible = false;

  start = createSprite(410,610,70,100);
  start.addImage(startImg);
  start.visible = false;

  gameOver = createSprite(400,400,800,800);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 1.5;

  bar = createSprite(400,790,800,60);
  bar.shapeColor = "blue";

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139, 87);

  time();

  

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    bottle.addImage(b2);
    pour.visible = true;
    Dog.addImage(happyDog);
    milk = milk - 1;
  }
  if(keyWentUp(UP_ARROW)){
    Dog.addImage(dogImg);
    bottle.addImage(b1);
    pour.visible = false;
  }

  if(gameState === "main"){
    main.visible = true;
    if(mouseX === 400 && mouseY === 500){
      main.visible = false;
    }
  }
  console.log(mouseX);
  console.log(mouseY);

  drawSprites();
  //add styles here
  if(gameState === "play"){
  fill("white");
  textSize(30);
  text("Note:- Press UP Arrow to feed Milk To Drago",100,790);

  textSize(25)
  text("Time:  "+ currentTime,560,90);

  textSize(25)
  text("Date:  "+ currentDate,560,50);

  textSize(25)
  text("Milk Left:  "+ milk,40,720);

  textSize(25)
  text("litres",190,720);

  if(milk <= 0){
    gameState = "end";
  }

  }
   if(gameState === "end"){ 
    gameOver.visible = true;
    fill("white");
    textSize(30)
    text("Refresh the page to play again.",200,790);
   }

  if(gameState === "main"){
    main.visible = true;
    start.visible = true;
  }
  if(mousePressedOver(start)){
    main.visible = false;
    start.visible = false;
    gameState="play";
 }

}
function writeStock(x){
   
  if(x<=0){
    x=0;
  }else{
    x = x - 1;
  }

  database.ref("/").update({
       Food : x
});

if (gameState === "play")
{
  database.ref("/").update({
    Food : 20
});
}
console.log(x);

}
function readStock(data){
 foods = data.val();
}
async function time(){
  var response = await fetch ("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var dateTime  = responseJSON.datetime;
  var t = dateTime.slice(11,19);
  var d = dateTime.slice(0,10);

  currentDate = d;
  currentTime = t;

}




