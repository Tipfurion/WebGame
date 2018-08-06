const canvas = document.getElementById("myCanvas"); 
const ctx = canvas.getContext("2d"); 
const canvasBg=document.getElementById("bg") 
const ctxBg = canvasBg.getContext("2d"); 

var Background=new Image(); 
Background.src="img/Bg.jpg" 

var bgX=0; 
var bgY=-980; 
var newBgY=-1980; 
var asteroidNumber=1; 
var score=0;
var spawnTime=400;
var asteroids=[]; 
Background.onload=function(){ 
setInterval(DrawBg,10); 
} 


var mousePos; 


var PlayerSprite= new Image(); 
PlayerSprite.src="img/PlayerSprite.png"; 
PlayerSprite.onload=function(){ 
Player={ 
sprite: PlayerSprite, 
width: PlayerSprite.width, 
height: PlayerSprite.height, 
x: canvas.width/2-PlayerSprite.width/2, //450 
y: canvas.height/2-PlayerSprite.height/2, // 463 
hp: 3 
} 
} 



var AsteroidSprite=new Image(); 
AsteroidSprite.src="img/Asteroid/Asteroid.png"; 
AsteroidSprite.onload=function(){ 
Asteroid={ 
sprite: AsteroidSprite, 
width: AsteroidSprite.width, 
height: AsteroidSprite.height, 
x:110, 
y:110, 
speed: 0, 
direction: 1 
} 
} 

function DrawBg() 
{ 
ctxBg.clearRect(0, 0, canvas.width, canvas.height); 
ctxBg.drawImage(Background, bgX, bgY) 
ctxBg.drawImage(Background, bgX, newBgY) 
bgY+=3; 
newBgY+=3; 
if(bgY>canvas.height){ 
bgY=-Background.height 
} 
if(newBgY>canvas.height){ 
newBgY=-Background.height; 
} 
} 



function Draw(){ 

ctx.clearRect(0, 0, canvas.width, canvas.height); 

for(let i=0;i<asteroids.length;i++){ 
ctx.drawImage(asteroids[i].sprite, asteroids[i].x, asteroids[i].y) 
} 

ctx.drawImage(Player.sprite,Player.x ,Player.y) 
ctx.fillStyle = "White";
ctx.font = "36px serif";
  ctx.fillText("Hp:"+Player.hp, 10, 50);
  ctx.fillText("Score:"+score, 800, 50);
} 

function Game() { 
for(let i=0;i<asteroids.length; i++){ 
switch(asteroids[i].direction){ 
case 1 :asteroids[i].y+=asteroids[i].speed; 

if(asteroids[i].y>canvas.height+50 ){ 
asteroids.splice(i,1); 
score++;
scoreCounter()


} break;//up 
case 2 :asteroids[i].y-=asteroids[i].speed; 

if(asteroids[i].y<-50 ){ 
asteroids.splice(i,1); 
score++;
scoreCounter()



} break;//down 
case 3 :asteroids[i].x+=asteroids[i].speed; 

if(asteroids[i].x>canvas.width+50 ){ 
asteroids.splice(i,1); 
score++;
scoreCounter()



} break;//left 
case 4 :asteroids[i].x-=asteroids[i].speed; 

if(asteroids[i].x <-50 ){ 

asteroids.splice(i,1); 
score++;
scoreCounter()


} break;//right 

} 

for(let j=0;j<asteroids.length;j++){
if(asteroids[i].x<asteroids[j].x+AsteroidSprite.width && asteroids[i].x>asteroids[j].x-AsteroidSprite.width && asteroids[i].y<asteroids[j].y+Asteroid.height && asteroids[i].y> asteroids[j].y-Asteroid.height){ 
  if(j!=i){
    if(i>j){
      asteroids.splice(i,1); asteroids.splice(j,1)
      score+=2;
    }
    else{
      asteroids.splice(j,1); asteroids.splice(i,1)
      score+=2;
    }
  }
}
}


if (Player.x<asteroids[i].x+Asteroid.sprite.width && Player.x>asteroids[i].x-Asteroid.sprite.width 
&& Player.y<asteroids[i].y + Asteroid.height && Player.y>asteroids[i].y-Asteroid.height) 
{ 
  asteroids.splice(i,1);
  let playerIsHit=false;
if(playerIsHit==false){
  scoreCounter()
Player.hp--;
score++;
playerIsHit=true;
setTimeout(function(){playerIsHit=false},1000 );
console.log(Player.hp);
}
} 
} 
if(Player.hp<=0){
  setTimeout(function(){if(alert('Your score: '+score)){}
  else    window.location.reload(); },100)   
  
}


} 

function getMousePos(canvas, evt) { 
let rect = canvas.getBoundingClientRect(); 
return { 
x: evt.clientX - rect.left, 
y: evt.clientY - rect.top 
}; 
} 

canvas.addEventListener('mousemove', function(evt) { 
mousePos = getMousePos(canvas, evt); 

if(mousePos.x>Player.width/2 && mousePos.x<canvas.width/2 || mousePos.x<canvas.width-Player.width/2 && mousePos.x>canvas.width/2){ 
Player.x=mousePos.x-Player.width/2; 
} 
if(mousePos.y>Player.height/2 && mousePos.y<canvas.height/2 || mousePos.y< canvas.height-Player.height/2 && mousePos.y> canvas.height/2){ 
Player.y=mousePos.y-Player.height/2; 
} 



}, false); 

function createObject(objName, obj){ 
objName = { }; 
for(let key in obj ){ 
objName[key]=obj[key] 
} 

objName.speed=getRandomInt(6,11); 
objName.direction=getRandomInt(1,5); 
switch(objName.direction){ 

case 1: objName.x=getRandomInt(0,canvas.width); objName.y=-canvas.height-100; break; //up 
case 2: objName.x=getRandomInt(0,canvas.width); objName.y=canvas.height+100; break; //down 
case 3: objName.x=-100; objName.y=getRandomInt(0,canvas.height); break; //left 
case 4: objName.x=canvas.width+100; objName.y=getRandomInt(0,canvas.height); break; //right 
} 
asteroids.push(objName); 

} 
function spawner(){ 
objName="Asteroid"+ asteroidNumber; 
createObject(objName,Asteroid); 

asteroidNumber++; 


} 

function getRandomInt(min, max){ 
return Math.floor(Math.random() * (max-min))+min; 
} 

function scoreCounter(){
  if(spawnTime>200){
    spawnTime-=score;
    console.log(spawnTime);
  }
}



setInterval(Draw,10 ); 
setInterval(Game,10 ); 
setInterval(spawner, spawnTime); 
