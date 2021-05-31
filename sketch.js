//Create variables here
var dog, database;
var foodStock, foodOBJ, fedTime, lastFed, feedI;
var sadDog, happyDog, Bedroom, Garden, Washroom, Livingroom;
var feed, addfood, bath, play, sleepy, park, hungry;
var currentTime, gameState, readState;
var gameState = 1

function preload()
{
	//load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  feedIMG = loadImage("virtual pet images/Food Stock.png");
  Bedroom = loadImage("virtual pet images/Bed Room.png")
  Garden = loadImage("virtual pet images/Garden.png")
  Washroom = loadImage("virtual pet images/Wash Room.png")
  Livingroom = loadImage("virtual pet images/Living Room.png")
}

function setup() {
	createCanvas(700, 800);

  database = firebase.database();

  dog = createSprite(350, 650, 50, 50);
  dog.addImage(sadDog);
  dog.scale = 0.2;

  foodOBJ = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  readState = database.ref("gameState")
  readState.on("value", 
  (data)=>
  {
     gameState = data.val();
  })

  fedTime = database.ref("FeedTime")
  fedTime.on("value", function (data){
    lastFed = data.val()
  })

   feed = createButton("Feed The Dog")
   feed.position(450, 60)
   feed.mousePressed(feedDog)

   addfood = createButton("Add Food")
   addfood.position(350, 60)
   addfood.mousePressed(addFood)

   bath = createButton("I Want To Take Bath")
   bath.position(250, 110)

   sleepy = createButton("I Am Very Sleepy")
   sleepy.position(580, 60)

   play = createButton("Lets Play!")
   play.position(400, 110)

   park = createButton("Lets Play In The Park")
   park.position(500, 110)

  }


function draw() {  

  background("green");

  if(keyDown(UP_ARROW))
  {
    dog.addImage(happyDog)

  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1)
  database.ref('/').update({
    Food: foodOBJ.getFoodStock(),
    FeedTime : hour()
  })
  }

  if(gameState === 1)
  {
    update(1)
    foodOBJ.display();
    dog.visible = true
    textSize(30)
  fill("black")
  text("I Am Your Puppy Moku I Am Hungry", 100, 160)
  text("Press Up Arrow Key To Feed Your Pet Dog Moku", 30, 30)

  }

  if(bath.mousePressed(function()
  {
     update(2)
  }
  ))

  if(gameState === 2)
  {
    foodOBJ.washroom();
    dog.visible = false
    textSize(30)
  fill("black")
  text("I Am Your Puppy Moku I Am Bathing", 100, 160)

  }

  if(sleepy.mousePressed(function()
  {
     update(3)
  }
  ))

  if(gameState === 3)
  {
    foodOBJ.bedroom();
    dog.visible = false
    textSize(30)
  fill("black")
  text("I Am Your Puppy Moku I Am Sleepy", 100, 160)

  }

  if(play.mousePressed(function()
  {
     update(4)
  }
  ))

  if(gameState === 4)
  {
    foodOBJ.livingroom();
    dog.visible = false;
    textSize(30)
  fill("black")
  text("I Am Your Puppy Moku I Am Playing", 100, 160)

  }

  if(park.mousePressed(function()
  {
     update(5)
  }
  ))

  if(gameState === 5)
  {
    foodOBJ.garden();
    dog.visible = false;
    textSize(30)
  fill("black")
  text("I Am Your Puppy Moku I Am Playing In The Park", 40, 160)

  }

  drawSprites()
  //add styles here
}

function readStock(data)
{
   foodS = data.val()
   foodOBJ.updateFoodStock(foodS)
}

function feedDog()
{
  update(1)

  dog.addImage(happyDog)

  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1)
  database.ref('/').update({
    Food: foodOBJ.getFoodStock(),
    FeedTime : hour()
  })
}

function addFood()
{
  update(1)

  dog.addImage(sadDog)
  foodS++;

  database.ref('/').update({
    Food: foodS
  })
}

function update(state)
{
  database.ref("/").update({
    gameState : state
  })
}