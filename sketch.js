var dog, happyDog, database, foodS, foodStock, dog_img, dog_img1;
var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload()
{
  dog_img = loadImage("dogImg.png");
  dog_img1 = loadImage("dogImg1.png");

  foodObj = new Food();
}

function setup() {
  createCanvas(900, 500);

  database = firebase.database();
  console.log(database);
  
  dog = createSprite(720, 220, 50, 50);
  dog.addImage(dog_img);
  dog.scale = 0.150;

  foodStock = database.ref('Food :D');
  foodStock.on("value", readStock);

  feed = createButton("Feed Dog :)");
  feed.position(800, 88);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(925, 88);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);

  fill("white");
  stroke(5);
  textSize(20);
  text("Milk Bottles left = " + foodS, 170, 50);
  text("My dog's name is Bruno", 600, 300);

  fedTime= database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed= data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed == 0){
    text("Last Fed : 12 AM", 350, 30);
  }
  else{
    text("Last Fed : " + lastFed + " AM", 350, 30);
  }

  foodObj.display();
  drawSprites();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val(); 
}

function feedDog(x){
  dog.addImage(dog_img1);
  writeStock();
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}