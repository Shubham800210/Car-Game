const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
console.log(score);

startScreen.addEventListener('click', gameStart);


let player = { carSpeed: 5 };
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
   console.log(keys);
}

function keyUp(e) {
   e.preventDefault();
   keys[e.key] = false;
   // console.log(e.key);
   console.log(keys);
}

function moveLines(){
   let  lines = document.querySelectorAll('.lines');

   lines.forEach(function(item) {

      // if(item.y >= 700){
      //    item.y -= 750;
      // }

      item.y += player.speed;
      item.style.top = item.y + "px";

   } )

}

function gamePlay() {
   console.log("hey play");
   let car = document.querySelector('.car');
   let road = gameArea.getBoundingClientRect();
   console.log(road);

   if (player.start) {

      moveLines();

      if (keys.ArrowUp && player.y > (road.top + 100)) {
         player.y -= player.carSpeed;
      }
      if (keys.ArrowDown && player.y < (road.bottom - 70)) {
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
   }

}

function gameStart() {

   gameArea.classList.remove('hide');
   startScreen.classList.add('hide');

   player.start = true;
   window.requestAnimationFrame(gamePlay);

   // create road Line 
   for( x=0; x<5; x++) {
      let roadLine = document.createElement('div');
      roadLine.setAttribute('class', 'lines');
      roadLine.y = (x*150);
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
   // console.log(car.offsetLeft)
}


