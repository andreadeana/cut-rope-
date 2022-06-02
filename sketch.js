const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3;
var fruit,ground;
var fruit_con;
var fruit_con2;
var fruit_con3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bg_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bg_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  frameRate(80);

  bg_song.play();
  bg_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(width/2-50,30);
  button.size(80,80);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(width/2-350,80);
  button2.size(80,80);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(width/2+150,150);
  button3.size(80,80);
  button3.mouseClicked(drop3);

  blower = createImg('balloon.png');
  blower.position(70,240);
  blower.size(200,130);
  blower.mouseClicked(airBlow);

  mute_btn = createImg('mute.png');
  mute_btn.position(width-100,50);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  
  rope = new Rope(7,{x:width/2,y:30});
  rope2 = new Rope(10,{x:width/2-320,y:80});
  rope3= new Rope(7,{x:width/2+180,y:150});

  ground = new Ground(width/2,height-20,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(width/2,height-150,100,100);
  bunny.scale = 0.3;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(width/2,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bg_img);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,120,120);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    sad_sound.play();
    bg_song.stop();
     
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play(); 
}

function drop2()
{
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cut_sound.play(); 
}

function drop3()
{
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  cut_sound.play(); 
}

function mute(){
  if (bg_song.isPlaying()){
    bg_song.stop();
      
  }
else{
  bg_song.play();
}
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play();
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


