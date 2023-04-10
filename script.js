//const jsdom = require('jsdom');
//const dom = new jsdom.JSDOM("");
/*
const jquery = require('jquery');

require(['jquery'], function($) {
    $(function() {
      var distance = 10;
      var speed = 100;
      $( 'body' ).on( 'keydown', function( e ) {
          var $target = $( '.character' );
          var top = $target.css( 'top' );
          var left = $target.css( 'left' );

          switch ( e.keyCode ) {
              case 37:  // [Left]
                  $target.animate({ 'left': '-=' + distance }, speed);
              break;

              case 38:  // [Up]
                  $target.animate({ 'top': '-=' + distance }, speed);
              break;

              case 39:  // [Right]
                  $target.animate({ 'left': '+=' + distance }, speed);
              break;

              case 40:  // [Down]
                  $target.animate({ 'top': '+=' + distance }, speed);
              break;

              default:
                  return;
          };
      });    
    });
})
*/




//import { fromEvent, throttleTime, scan } from 'rxjs';


const gameDiv = document.getElementById('game');
const charDiv = document.getElementById('character');
const charP2Div = document.getElementById('characterP2');
const button = document.getElementById('button');
const resButton = document.getElementById('resButton');
const pangui1 = document.getElementById('pangui1');
const pangui2 = document.getElementById('pangui2');
const pangui3 = document.getElementById('pangui3');

let start = false;

//const keydown$ = Rx.fromEvent(document, "keydown");

document.addEventListener('keydown',handleKeys);


//fromEvent(document, 'keydown').subscribe(() => console.log(x));

const movement = 18;
const layout =[
  ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
  ['X','.','.','.','.','.','.','.','.','.','.','.','.','X','X','.','.','.','.','.','.','.','.','.','.','.','.','X'],
  ['X','.','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','.','X'],
  ['X','.','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','.','X'],
  ['X','.','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','.','X'],
  ['X','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','X'],
  ['X','.','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','.','X'],
  ['X','.','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','.','X'],
  ['X','.','.','.','.','.','.','X','X','.','.','.','.','X','X','.','.','.','.','X','X','.','.','.','.','.','.','X'],
  ['X','X','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','.','.','.','.','.','.','.','.','.','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','X','X','X','-','-','X','X','X','.','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','X','h','h','h','h','h','h','X','.','X','X','.','X','X','X','X','X','X'],
  ['.','.','.','.','.','.','.','.','.','.','X','h','h','h','h','h','h','X','.','.','.','.','.','.','.','.','.','.'],
  ['X','X','X','X','X','X','.','X','X','.','X','h','h','h','h','h','h','X','.','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','.','.','.','.','.','.','.','.','.','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X'],
  ['X','.','.','.','.','.','.','.','.','.','.','.','.','X','X','.','.','.','.','.','.','.','.','.','.','.','.','X'],
  ['X','.','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','.','X'],
  ['X','.','X','X','X','X','.','X','X','X','X','X','.','X','X','.','X','X','X','X','X','.','X','X','X','X','.','X'],
  ['X','.','.','.','X','X','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','X','X','.','.','.','X'],
  ['X','X','X','.','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','.','X','X','X'],
  ['X','X','X','.','X','X','.','X','X','.','X','X','X','X','X','X','X','X','.','X','X','.','X','X','.','X','X','X'],
  ['X','.','.','.','.','.','.','X','X','.','.','.','.','X','X','.','.','.','.','X','X','.','.','.','.','.','.','X'],
  ['X','.','X','X','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','X','X','.','X'],
  ['X','.','X','X','X','X','X','X','X','X','X','X','.','X','X','.','X','X','X','X','X','X','X','X','X','X','.','X'],
  ['X','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','X'],
  ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
  ];


function handleKeys(e){
  let keypress = e.code;
  console.log(keypress);
  switch (keypress) {
    case 'ArrowRight':
      if (checkMove(1,x,y)){
        if (x == 486) {
          x = 0;
        } else {
          x+=movement;
        }
        charDiv.style.left = x + 'px';
      } 
      break;
    case 'ArrowLeft':
      if (checkMove(2,x,y)){
        if (x == 0) {
          x = 486;
        } else {
          x-=movement;
        }
        charDiv.style.left = x + 'px';
      } 
      break;
    case 'ArrowUp':
      if (checkMove(3,x,y)){
        y-=movement;
        charDiv.style.top = y + 'px';
      } 
      break;
    case 'ArrowDown':
      if (checkMove(4,x,y)){
        y+=movement;
        charDiv.style.top = y + 'px';
      } 
      break;
    case 'KeyD':
      if (checkMove(1,x2,y2)){
        if (x2 == 486) {
          x2 = 0;
        } else {
          x2+=movement;
        }
        charP2Div.style.left = x2 + 'px';
      } 
      break;
    case 'KeyA':
      if (checkMove(2,x2,y2)){
        if (x2 == 0) {
          x2 = 486;
        } else {
          x2-=movement;
        }
        charP2Div.style.left = x2 + 'px';
      } 
      break;
    case 'KeyW':
      if (checkMove(3,x2,y2)){
        y2-=movement;
        charP2Div.style.top = y2 + 'px';
      } 
      break;
    case 'KeyS':
      if (checkMove(4,x2,y2)){
        y2+=movement;
        charP2Div.style.top = y2 + 'px';
      } 
      break;
    default:
      console.log(x,y);
      console.log(x2,y2);
      break;
  }
}

let x = 234; //18 * 13
let y = 414; //18 * 23
let x2 = 252; //18 * 14
let y2 = 414; //18 * 23

let xEnemigo1 = 234; //18 * 13
let yEnemigo1 = 198; //18 * 23
let xEnemigo2 = 252; //18 * 14
let yEnemigo2 = 198; //18 * 23
let xEnemigo3 = 216; //18 * 14
let yEnemigo3 = 414; //18 * 23

pangui1.style.left = xEnemigo1 + 'px';
pangui1.style.top = yEnemigo1 + 'px';
pangui2.style.left = xEnemigo2 + 'px';
pangui2.style.top = yEnemigo2 + 'px';
pangui3.style.left = xEnemigo3 + 'px';
pangui3.style.top = yEnemigo3 + 'px';



charDiv.style.left = x + 'px';
charDiv.style.top = y + 'px';
charP2Div.style.left = x2 + 'px';
charP2Div.style.top = y2 + 'px';

//no funciona bien, se laggea una movida
function checkMove(input,x,y){
  if (start == false){
    return false;
  }

  let new_x;
  let new_y;
  let grid_x;
  let grid_y;
  let grid_char; 

  if (input == 1) {
    //RIGHT
    new_y = y;

    if(x == 486) {
      new_x = 0
    } else {
      new_x = x + 18;
    }
  } else if (input == 2) {
    //LEFT
    new_y = y;

    if(x == 0) {
      new_x = 486
    } else {
      new_x = x - 18;
    }
  } else if (input == 3) {
    //UP
    new_y = y - 18;
    new_x = x;
  } else if (input == 4) {
    //DOWN
    new_y = y + 18;
    new_x = x;
  }

  grid_y = new_y / 18;
  grid_x = new_x / 18;

  grid_char = layout[grid_y][grid_x];

  if (grid_char == "."){
    return true;
  }
  return false;
}


function startGame(){
  console.log("START");
  button.disabled = "disabled";
  button.src = 'imgs/BotonStartGris.png'
  resButton.src = 'imgs/RestartX.png';
  resButton.disabled = false;
  charDiv.style.visibility="visible";
  charP2Div.style.visibility="visible";
  pangui1.style.visibility="visible";
  pangui2.style.visibility="visible";
  pangui3.style.visibility="visible";
  start = true;
  
}

function restartGame(){
  console.log('RESTART');
  button.disabled = false;
  resButton.disabled = 'disabled';
  button.src = 'imgs/BotonStartAzul.png'
  resButton.src = 'imgs/RestartXGris.png';
  charDiv.style.visibility="hidden";
  charP2Div.style.visibility="hidden";
  pangui1.style.visibility="hidden";
  pangui2.style.visibility="hidden";
  pangui3.style.visibility="hidden";
  start = false;

  x = 234;
  y = 414;
  charDiv.style.left=x + 'px';
  charDiv.style.top=y + 'px';

  x2 = 252;
  y2 = 414;
  charP2Div.style.left=x2 + 'px';
  charP2Div.style.top=y2 + 'px';
}
/*
var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';
document.getElementsByTagName('body')[0].appendChild(iDiv);

// Now create and append to iDiv
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';

// The variable iDiv is still good... Just append to it.
iDiv.appendChild(innerDiv);
*/




/*
const mazeWidth = maze.offsetWidth;
const mazeHeight = maze.offsetHeight;
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;





  // Detect collision with walls
  const playerRect = player.getBoundingClientRect();
  const mazeRect = maze.getBoundingClientRect();
  if (playerRect.left < mazeRect.left) {
    x = 0;
  }
  if (playerRect.right > mazeRect.right) {
    x = mazeWidth - playerWidth;
  }
  if (playerRect.top < mazeRect.top) {
    y = 0;
  }
  if (playerRect.bottom > mazeRect.bottom) {
    y = mazeHeight - playerHeight;
  }

  player.style.left = x + 'px';
  player.style.top = y + 'px';
});

/*
const mazeWidth = maze.offsetWidth;
const mazeHeight = maze.offsetHeight;
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;


// index.js
//const maze = document.getElementById("maze");

// Crear un observable para los eventos de teclado
const keydown$ = Rx.fromEvent(document, "keydown");

// Crear un observable para las actualizaciones de la posición del personaje
const position$ = keydown$.pipe(
  map((event) => {
    // Obtener la dirección del evento de teclado
    const direction = event.key;

    // Actualizar la posición del personaje en función de la dirección
    // Aquí se puede usar la misma lógica que en el ejemplo anterior
    return newPosition;
  })
);

// Suscribirse al observable de posición para actualizar el laberinto
position$.subscribe((position) => {
  // Actualizar la posición del personaje en el laberinto
  // Aquí se puede usar la misma lógica que en el ejemplo anterior
  maze.style.left = position.x + "px";
  maze.style.top = position.y + "px";
});


let x = 0;
let y = 0;

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'a':
      x -= 10;
      break;
    case 'd':
      x += 10;
      break;
    case 'w':
      y -= 10;
      break;
    case 's':
      y += 10;
      break;
    default:
      break;
  }

  // Detect collision with walls
  const playerRect = player.getBoundingClientRect();
  const mazeRect = maze.getBoundingClientRect();
  if (playerRect.left < mazeRect.left) {
    x = 0;
  }
  if (playerRect.right > mazeRect.right) {
    x = mazeWidth - playerWidth;
  }
  if (playerRect.top < mazeRect.top) {
    y = 0;
  }
  if (playerRect.bottom > mazeRect.bottom) {
    y = mazeHeight - playerHeight;
  }

  player.style.left = x + 'px';
  player.style.top = y + 'px';
});



//<div id="pacman"></div>
//<script src="index.js"></script>
*/
/*
var character = document.getElementById("character");
var enemy = document.getElementById("enemy");

function jump() {

  if (character.classlist != "animate") {
    character.classList.add("animate");
  }
  setTimeout(function() {
    character.classList.remove("animate");
  }, 500);

}



function right() {

  var leftVal =  parseInt(window.getComputedStyle(character).getPropertyValue("left"))
  character.style.left = (leftVal + 30) + "px";

}

function left() {

  var leftVal =  parseInt(window.getComputedStyle(character).getPropertyValue("left"))
  character.style.left = (leftVal - 30) + "px";

}


var checkDead = setInterval(function() {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));

  //console.log(characterTop);
  //commented this out while working on css
  /*
    
  if(
      enemyLeft<30 && enemyLeft>0 && characterTop>=360
  )
  {
      enemy.style.animation="none"; //remove the animation
      enemy.style.display="none";
      alert("Poke.....I got you there!");
      
  }
    
  

}, 10);

addEventListener("keyup", function(e) {
  if (e.keyCode === 37) {
    left()
  }
})

addEventListener("keyup", function(e) {
  if (e.keyCode === 38) {
    jump()
  }
})

addEventListener("keyup", function(e) {
  if (e.keyCode === 39) {
    right()
  }
})
*/