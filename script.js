//import { fromEvent, throttleTime, scan } from 'rxjs';


const gameDiv = document.getElementById('game');
const charDiv = document.getElementById('character');
const charP2Div = document.getElementById('characterP2');
const button = document.getElementById('button');
const resButton = document.getElementById('resButton');
const pangui1 = document.getElementById('pangui1');
const pangui2 = document.getElementById('pangui2');
const pangui3 = document.getElementById('pangui3');
const panguis = [pangui1,pangui2,pangui3];

const divFruta = document.getElementById('fruit');
const divPill1 = document.getElementById('pill1')
const divPill2 = document.getElementById('pill2')
const divPill3 = document.getElementById('pill3')
const divPill4 = document.getElementById('pill4')

let start = false;
let boolFruta = true;
let Pill1 = true;
let Pill2 = true;
let Pill3 = true;
let Pill4 = true;

let score = 0;
document.getElementById("score").innerHTML = score;

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

        eat(x, y);
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

        eat(x, y);
      } 
      break;
    case 'ArrowUp':
      if (checkMove(3,x,y)){
        y-=movement;
        charDiv.style.top = y + 'px';

        eat(x, y);
      } 
      break;
    case 'ArrowDown':
      if (checkMove(4,x,y)){
        y+=movement;
        charDiv.style.top = y + 'px';

        eat(x, y);
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

        eat(x2, y2);
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

        eat(x2, y2);
      } 
      break;
    case 'KeyW':
      if (checkMove(3,x2,y2)){
        y2-=movement;
        charP2Div.style.top = y2 + 'px';

        eat(x2, y2);

      } 
      break;
    case 'KeyS':
      if (checkMove(4,x2,y2)){
        y2+=movement;
        charP2Div.style.top = y2 + 'px';

        eat(x2, y2);
      } 
      break;
    default:
      console.log(x,y);
      console.log(x2,y2);
      break;
  }
}

let x;
let y;
let x2;
let y2;

let xEnemigo1;
let yEnemigo1;
let xEnemigo2;
let yEnemigo2;
let xEnemigo3;
let yEnemigo3;

const panguiCords=[[234,198],[252,198],[216,198]];

panguis.map((value,index)=>{
  value.style.left = panguiCords[index][0] + 'px';
  value.style.top = panguiCords[index][1] + 'px';
})

/* pangui1.style.left = xEnemigo1 + 'px';
pangui1.style.top = yEnemigo1 + 'px';
pangui2.style.left = xEnemigo2 + 'px';
pangui2.style.top = yEnemigo2 + 'px';
pangui3.style.left = xEnemigo3 + 'px';
pangui3.style.top = yEnemigo3 + 'px'; */

let xFruta;
let yFruta;

setInitialValues();
setInitialPositions();

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
  startTimer();
  
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
  divFruta.style.visibility="visible";
  divPill1.style.visibility="visible";
  divPill2.style.visibility="visible";
  divPill3.style.visibility="visible";
  divPill4.style.visibility="visible";
   start = false;
  abortTimer();

  setInitialPositions()
  setInitialValues();
}

function checkForFruit(x, y){
  if (boolFruta) {
    if (x == xFruta && y == yFruta) {
      return true;
    }

    return false;
  }

  return false;
}

function eatFruit(){
  score += 200;
  document.getElementById("score").innerHTML = score;
  divFruta.style.visibility = 'hidden';
  boolFruta = false;
}

function showFruit(){
  let fruitX;
  let fruitY;
}

function checkForPill(x, y){
  if (x == 18 && y == 18 && Pill1) {
    return 1;
  } else if (x == 468 && y == 18 && Pill2) {
    return 2;
  } else if (x == 18 && y == 522 && Pill3) {
    return 3;
  } else if (x == 468 && y == 522 && Pill4) {
    return 4;
  }

  return 0;
}

function eatPill(pill) {
  console.log("POWER PILL");
  score += 100;
  document.getElementById("score").innerHTML = score;

  if (pill == 1) {
    Pill1 = false;
    divPill1.style.visibility = 'hidden';
  }
  else if (pill == 2) {
    Pill2 = false;
    divPill2.style.visibility = 'hidden';
  }
  else if (pill == 3) {
    Pill3 = false;
    divPill3.style.visibility = 'hidden';
  }
  else if (pill == 4) {
    Pill4 = false;
    divPill4.style.visibility = 'hidden';
  }
}

function eat(x, y) {
  let ateFruit = checkForFruit(x, y);
  if (ateFruit) {eatFruit();}

  let pill = checkForPill(x, y);
  if (pill != 0) {eatPill(pill);}
}
function setInitialValues(){
  x = 234; //18 * 13
  y = 414; //18 * 23
  x2 = 252; //18 * 14
  y2 = 414; //18 * 23

  xEnemigo1 = 234; //18 * 13
  yEnemigo1 = 198; //18 * 23
  xEnemigo2 = 252; //18 * 14
  yEnemigo2 = 198; //18 * 23
  xEnemigo3 = 216; //18 * 14
  yEnemigo3 = 414; //18 * 23

  xFruta = 18 * 14;
  yFruta = 18 * 17;

  boolFruta = true;
  start = false;
  Pill1 = true;
  Pill2 = true;
  Pill3 = true;
  Pill4 = true;
}

function setInitialPositions(){
  pangui1.style.left = xEnemigo1 + 'px';
  pangui1.style.top = yEnemigo1 + 'px';
  pangui2.style.left = xEnemigo2 + 'px';
  pangui2.style.top = yEnemigo2 + 'px';
  pangui3.style.left = xEnemigo3 + 'px';
  pangui3.style.top = yEnemigo3 + 'px';

  divFruta.style.top = '306px';
  divFruta.style.left = '252px';

  charDiv.style.left = '234px';
  charDiv.style.top = '414px';
  charP2Div.style.left ='252px';
  charP2Div.style.top = '414px';

  divPill1.style.top = '18px';
  divPill1.style.left = '18px';

  divPill2.style.top = '18px';
  divPill2.style.left = '468px';

  divPill3.style.top = '522px';
  divPill3.style.left = '18px';

  divPill4.style.top = '522px';
  divPill4.style.left = '468px';


}

// en el setup
var tid;
//en el start
function randomMov(){
/*   console.log("randomMov");
  console.log(panguiCords);
  console.log(panguis); */
  panguis.map((value,index)=>{
    console.log(panguiCords);
    let panguiMoves = [
      [panguiCords[index][1], panguiCords[index][0]+movement],
      [panguiCords[index][1], panguiCords[index][0]-movement],
      [panguiCords[index][1]-movement, panguiCords[index][0]],
      [panguiCords[index][1]+movement, panguiCords[index][0]]
      ].filter(e=>layout[e[0]/18][e[1]/18] === ".");
      console.log(panguiMoves);
      let par1 = Math.floor(Math.random() * panguiMoves.length);
      panguiCords[index][0]=panguiMoves[par1][1];
      panguiCords[index][1]=panguiMoves[par1][0];
      value.style.left = panguiMoves[par1][1] + 'px';
      value.style.top = panguiMoves[par1][0] + 'px';
  })
}

function abortTimer() { // to be called when you want to stop the timer
  clearInterval(tid);
}

function startTimer() { // to be called when you want to start the timer
  tid = setInterval(randomMov,200);
}
