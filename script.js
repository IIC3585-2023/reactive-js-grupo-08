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







let gameDiv = document.getElementById('game');
let charDiv = document.getElementById('character');

//const keydown$ = Rx.fromEvent(document, "keydown");

document.addEventListener('keydown',handleKeys);
var charLeftAdd =0;
var charUpAdd = 0;
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
  switch (keypress) {
    case 'ArrowRight':
      if (checkMove(1)){
        if (x == 486) {
          x = 0;
        } else {
          x+=movement;
        }
        charDiv.style.left = x + 'px';
      } 
      break;
    case 'ArrowLeft':
      if (checkMove(2)){
        if (x == 0) {
          x = 486;
        } else {
          x-=movement;
        }
        charDiv.style.left = x + 'px';
      } 
      break;
    case 'ArrowUp':
      if (checkMove(3)){
        y-=movement;
        charDiv.style.top = y + 'px';
      } 
      break;
    case 'ArrowDown':
      if (checkMove(4)){
        y+=movement;
        charDiv.style.top = y + 'px';
      } 
      break;
    default:
      console.log(x,y);
      break;
  }
}

let x = 234; //18 * 13
let y = 414; //18 * 23

charDiv.style.left=x + 'px';
charDiv.style.top=y + 'px';


//no funciona bien, se laggea una movida
function checkMove(input){
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
    return true
  }
  return false;
}

function add(dim,input){
  dim+=input;
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