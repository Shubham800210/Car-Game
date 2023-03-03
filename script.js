const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
console.log(score);

startScreen.addEventListener('click', gameStart);


let player = { carSpeed: 5, score:0 };
let keys = {
   ArrowUp: false,
   ArrowDown: false,
   ArrowLeft: false,
   ArrowRight: false
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
   e.preventDefault();
   keys[e.key] = true;
   // console.log(e.key);
   // console.log(keys);
}

function keyUp(e) {
   e.preventDefault();
   keys[e.key] = false;
   // console.log(e.key);
   // console.log(keys);
}


function isCollide(a, b) {
   aRect = a.getBoundingClientRect();
   bRect = b.getBoundingClientRect();
   return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||  (aRect.left > bRect.right) || (aRect.right < bRect.left));
}


function moveLines(){
   let  lines = document.querySelectorAll('.lines');

   lines.forEach(function(item) {

      if(item.y >= 700){
         item.y -= 750;
      }

      item.y += player.carSpeed;
      item.style.top = item.y + "px";

   } )

}

function endGame(){

   player.start = false;
   startScreen.classList.remove('hide');

}

function moveEnemy(car){
   let  enemy = document.querySelectorAll('.enemy');

   enemy.forEach(function(item) {

      if(isCollide(car, item)){
         
         // console.log("Boom Hit");
         endGame();
     }

      if(item.y >= 750){
         item.y = -300;
         item.style.left = Math.floor(Math.random()*350) + "px";
      }
      item.y += player.carSpeed;
      item.style.top = item.y + "px";

   } )

}

function gamePlay() {
   // console.log("hey play");
   let car = document.querySelector('.car');
   let road = gameArea.getBoundingClientRect();
   // console.log(road);

   if (player.start) {

      moveLines();
      moveEnemy(car);

      if (keys.ArrowUp && player.y > (road.top + 100)) {
         player.y -= player.carSpeed;
      }
      if (keys.ArrowDown && player.y < (road.bottom - 85)) {
         player.y += player.carSpeed;
      }
      if (keys.ArrowLeft && player.x > 0) {
         player.x -= player.carSpeed;
      }
      if (keys.ArrowRight && player.x < (road.width - 53)) {
         player.x += player.carSpeed;
      }

      car.style.top = player.y + "px";
      car.style.left = player.x + "px";

      window.requestAnimationFrame(gamePlay);
      // console.log(player.score++);
      player.score++;
      score.innerText = "score: "+ player.score;
   }

}

function gameStart() {

   // gameArea.classList.remove('hide');
   startScreen.classList.add('hide');
   gameArea.innerHTML = "";

   player.start = true;
   player.score = 0;
   window.requestAnimationFrame(gamePlay);

   // create road Line 
for(let x = 0; x < 5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }


   // create car-img div 
   let car = document.createElement('div');
   car.setAttribute('class', 'car');
   // car.innerText ="hey ia m car";
   gameArea.appendChild(car);


   player.x = car.offsetLeft;
   player.y = car.offsetTop;


   // console.log(car.offsetTop);
   // console.log(car.offsetLeft);


   for(let x = 0; x < 3; x++){
      let enemyCar = document.createElement('div');
      enemyCar.setAttribute('class', 'enemy');
      enemyCar.y = ((x+1)* 350) * -1;
      enemyCar.style.top = enemyCar.y + "px";
      enemyCar.style.backgroundColor = 'blue';
      enemyCar.style.left = Math.floor(Math.random()*350) + "px";
      gameArea.appendChild(enemyCar);
  }


}


