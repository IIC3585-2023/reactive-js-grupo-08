import { fromEvent, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
//import $ from 'jquery';
import mapp from "./images/map.png";
import m_01 from "./images/m_01.png";
import f_01 from "./images/f_01.png";
import fruit from "./images/Fruit.png";
import pwPill from "./images/PowerPill.png";
import panguiImg from "./images/Pangui.png";
import resButtonImg from "./images/RestartX.png";
import resButtonImgGris from "./images/RestartXGris.png";
import startButtonImg from "./images/BotonStartAzul.png";
import startButtonImgGris from "./images/BotonStartGris.png";
import gameOverImg from "./images/GameOver.png";

import "./style.css";
let start = false;
let boolFruta = true;
let Pill1 = true;
let Pill2 = true;
let Pill3 = true;
let Pill4 = true;
const movement = 18;

type GameState = {
  start: boolean;
  boolFruta: boolean;
  Pill1: boolean;
  Pill2: boolean;
  Pill3: boolean;
  Pill4: boolean;
};

(document.getElementById("imgBack") as HTMLImageElement).src = mapp;
(document.getElementById("imgFruit") as HTMLImageElement).src = fruit;
(document.getElementById("imgChar") as HTMLImageElement).src = m_01;
(document.getElementById("imgChar2") as HTMLImageElement).src = f_01;
(document.getElementById("imgPangui1") as HTMLImageElement).src = panguiImg;
(document.getElementById("imgPangui2") as HTMLImageElement).src = panguiImg;
(document.getElementById("imgPangui3") as HTMLImageElement).src = panguiImg;
(document.getElementById("imgPangui4") as HTMLImageElement).src = panguiImg;
(document.getElementById("imgPill1") as HTMLImageElement).src = pwPill;
(document.getElementById("imgPill2") as HTMLImageElement).src = pwPill;
(document.getElementById("imgPill3") as HTMLImageElement).src = pwPill;
(document.getElementById("imgPill4") as HTMLImageElement).src = pwPill;
(document.getElementById("imgGameOver") as HTMLImageElement).src = gameOverImg;
(document.getElementById("resButton") as HTMLInputElement).src = resButtonImg;
(document.getElementById("button") as HTMLInputElement).src = startButtonImg;
//(document.getElementById("score") as HTMLInputElement).src = scorenumber;

const gameDiv = document.getElementById("game");
const charDiv = document.getElementById("character");
const charP2Div = document.getElementById("characterP2");
const button = document.getElementById("button");
const resButton = document.getElementById("resButton");
const gameOver = document.getElementById("gameOver");
const powerText = document.getElementById("powerText");

const pangui1 = document.getElementById("pangui1");
const pangui2 = document.getElementById("pangui2");
const pangui3 = document.getElementById("pangui3");
const pangui4 = document.getElementById("pangui4");
const panguis = [pangui1, pangui2, pangui3, pangui4];

const divFruta = document.getElementById("fruit");
const divPill1 = document.getElementById("pill1");
const divPill2 = document.getElementById("pill2");
const divPill3 = document.getElementById("pill3");
const divPill4 = document.getElementById("pill4");
const items = [divFruta, divPill1, divPill2, divPill3, divPill4];

const imgBack = <HTMLImageElement>document.getElementById("imgBack");
const imgFruit = <HTMLImageElement>document.getElementById("imgFruit");
const imgChar = <HTMLImageElement>document.getElementById("imgChar");
const imgChar2 = <HTMLImageElement>document.getElementById("imgChar2");

const isWASDKey = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase();
  return ["w", "a", "s", "d"].includes(key);
};

const isArrowKey = (event: KeyboardEvent) => {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
    event.key
  );
};

const wasdKeyObservable = fromEvent(document, "keydown").pipe(
  filter((event: KeyboardEvent) => isWASDKey(event)),
  map((event) => event.key.toLowerCase())
);

const arrowKeyObservable = fromEvent(document, "keydown").pipe(
  filter((event: KeyboardEvent) => isArrowKey(event)),
  map((event) => event.key)
);

wasdKeyObservable.subscribe((wasdKey) => {
  handleKeys(wasdKey);
  console.log(`WASD key pressed: ${wasdKey}`);
});

arrowKeyObservable.subscribe((arrowKey) => {
  handleKeys(arrowKey);
  console.log(`Arrow key pressed: ${arrowKey}`);
});

fromEvent(button, "click").subscribe(startGame);
fromEvent(resButton, "click").subscribe(restartGame);
setInitialPositions();
setInitialValues();

function handleKeys(keypress: string) {
  switch (keypress) {
    case "ArrowRight":
      if (checkMove(1, x, y)) {
        if (x == 486) {
          x = 0;
        } else {
          x += movement;
        }
        charDiv.style.left = x + "px";
        afterPlayerMovement({ x: x, y: y });
      }
      break;
    case "ArrowLeft":
      if (checkMove(2, x, y)) {
        if (x == 0) {
          x = 486;
        } else {
          x -= movement;
        }
        charDiv.style.left = x + "px";
        afterPlayerMovement({ x: x, y: y });
      }
      break;
    case "ArrowUp":
      if (checkMove(3, x, y)) {
        y -= movement;
        charDiv.style.top = y + "px";
        afterPlayerMovement({ x: x, y: y });
      }
      break;
    case "ArrowDown":
      if (checkMove(4, x, y)) {
        y += movement;
        charDiv.style.top = y + "px";
        afterPlayerMovement({ x: x, y: y });
      }
      break;
    case "d":
      if (checkMove(1, x2, y2)) {
        if (x2 == 486) {
          x2 = 0;
        } else {
          x2 += movement;
        }
        charP2Div.style.left = x2 + "px";
        afterPlayerMovement({ x: x2, y: y2 });
      }
      break;
    case "a":
      if (checkMove(2, x2, y2)) {
        if (x2 == 0) {
          x2 = 486;
        } else {
          x2 -= movement;
        }
        charP2Div.style.left = x2 + "px";
        afterPlayerMovement({ x: x2, y: y2 });
      }
      break;
    case "w":
      if (checkMove(3, x2, y2)) {
        y2 -= movement;
        charP2Div.style.top = y2 + "px";
        afterPlayerMovement({ x: x2, y: y2 });
      }
      break;
    case "s":
      if (checkMove(4, x2, y2)) {
        y2 += movement;
        charP2Div.style.top = y2 + "px";
        afterPlayerMovement({ x: x2, y: y2 });
      }
      break;
    default:
      //console.log(x,y);
      //console.log(x2,y2);
      break;
  }
  /* afterPlayerMovement(x, y);
   afterPlayerMovement(x2, y2); */
}

type CoordinatesPlayer = {
  x: number;
  y: number;
};

function afterPlayerMovement(props: CoordinatesPlayer) {
  eat(props);
  panguiCords.map((cords) => {
    if (cords[0] == props.x && cords[1] == props.y && !invincible) {
      console.log("PX");
      endGame();
    }
  });
}

function eat(props: CoordinatesPlayer) {
  let ateFruit = checkForFruit(props);
  if (ateFruit) {
    eatFruit();
  }

  let pill = checkForPill({ x: props.x, y: props.y });
  if (pill != 0) {
    eatPill(pill);
  }
}
function checkForFruit(props: CoordinatesPlayer) {
  if (boolFruta) {
    if (props.x == xFruta && props.y == yFruta) {
      return true;
    }
    return false;
  }
  return false;
}

function checkForPill(props: CoordinatesPlayer) {
  if (props.x == 18 && props.y == 18 && Pill1) {
    return 1;
  } else if (props.x == 468 && props.y == 18 && Pill2) {
    return 2;
  } else if (props.x == 18 && props.y == 522 && Pill3) {
    return 3;
  } else if (props.x == 468 && props.y == 522 && Pill4) {
    return 4;
  }
  return 0;
}

function checkMove(input: number, x: number, y: number) {
  if (start == false) {
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

    if (x == 486) {
      new_x = 0;
    } else {
      new_x = x + 18;
    }
  } else if (input == 2) {
    //LEFT
    new_y = y;

    if (x == 0) {
      new_x = 486;
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

  if (grid_char == ".") {
    return true;
  }
  return false;
}

//CopyPaste
const layout = [
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "-",
    "-",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "h",
    "h",
    "h",
    "h",
    "h",
    "h",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "h",
    "h",
    "h",
    "h",
    "h",
    "h",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "h",
    "h",
    "h",
    "h",
    "h",
    "h",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    "X",
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
    "X",
    ".",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    ".",
    "X",
  ],
  [
    "X",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "X",
  ],
  [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ],
];
let xFruta: number;
let yFruta: number;
let x = 234; //18 * 13
let y = 414; //18 * 23
let x2 = 252; //18 * 14
let y2 = 414;
let score = 0;
let seconds = 0;
let minutes = 0;

let playerCords = [
  [x, y],
  [x2, y2],
];

let panguiCords = [
  [234, 198],
  [252, 198],
  [216, 198],
  [270, 198],
];

panguis.map((value, index) => {
  value.style.left = panguiCords[index][0] + "px";
  value.style.top = panguiCords[index][1] + "px";
});
function startGame() {
  //console.log("START");
  setInitialPositions();
  setInitialValues();

  //button.setAttribute('disabled', "disabled");
  (document.getElementById("button") as HTMLInputElement).src =
    startButtonImgGris;
  (document.getElementById("resButton") as HTMLInputElement).src = resButtonImg;
  //resButton.setAttribute('disabled', "");
  (<HTMLInputElement>document.getElementById("button")).disabled = true;
  (<HTMLInputElement>document.getElementById("resButton")).disabled = false;
  charDiv.style.visibility = "visible";
  charP2Div.style.visibility = "visible";
  pangui1.style.visibility = "visible";
  pangui2.style.visibility = "visible";
  pangui3.style.visibility = "visible";
  pangui4.style.visibility = "visible";
  start = true;
  startTimer();
  timeKeeper();
}

function restartGame() {
  //console.log('RESTART');
  //button.setAttribute('disabled', "");
  (<HTMLInputElement>document.getElementById("button")).disabled = false;
  (<HTMLInputElement>document.getElementById("resButton")).disabled = true;
  //resButton.setAttribute('disabled', "disabled");
  (document.getElementById("button") as HTMLInputElement).src = startButtonImg;
  (document.getElementById("resButton") as HTMLInputElement).src =
    resButtonImgGris;
  charDiv.style.visibility = "hidden";
  charP2Div.style.visibility = "hidden";
  pangui1.style.visibility = "hidden";
  pangui2.style.visibility = "hidden";
  pangui3.style.visibility = "hidden";
  pangui4.style.visibility = "hidden";
  /*   divFruta.style.visibility="visible";
  divPill1.style.visibility="visible";
  divPill2.style.visibility="visible";
  divPill3.style.visibility="visible";
  divPill4.style.visibility="visible"; */
  items.map((item) => (item.style.visibility = "visible"));
  gameOver.style.visibility = "hidden";
  start = false;
  seconds = 0;
  minutes = 0;
  abortTimer();
  clearInterval(tkId);
}

function endGame() {
  start = false;
  abortTimer();
  clearInterval(tkId);
  setInitialPositions();
  charDiv.style.visibility = "hidden";
  charP2Div.style.visibility = "hidden";
  gameOver.style.visibility = "visible";
  //algo para mostrar el puntaje
}

function eatPill(pill: number) {
  //console.log("POWER PILL");
  score += 100;
  document.getElementById("score").textContent = score + "";
  if (pill == 1) {
    Pill1 = false;
    divPill1.style.visibility = "hidden";
  } else if (pill == 2) {
    Pill2 = false;
    divPill2.style.visibility = "hidden";
  } else if (pill == 3) {
    Pill3 = false;
    divPill3.style.visibility = "hidden";
  } else if (pill == 4) {
    Pill4 = false;
    divPill4.style.visibility = "hidden";
  }
  powerup();
}

function checkCollision(px: number, py: number) {
  if (px == x && py == y) {
    console.log("P1");
    endGame();
  } else if (px == x2 && py == y2) {
    console.log("P2");
    endGame();
  }
}

function setInitialValues() {
  x = 234; //18 * 13
  y = 414; //18 * 23
  x2 = 252; //18 * 14
  y2 = 414; //18 * 23

  xFruta = 18 * 14;
  yFruta = 18 * 17;

  start = false;
  boolFruta = true;
  Pill1 = true;
  Pill2 = true;
  Pill3 = true;
  Pill4 = true;
  //boolItems.map(item=>item=true);

  score = 0;
  document.getElementById("score").textContent = score + "";
  seconds = 0;
  minutes = 0;
  document.getElementById("minutes:seconds").innerHTML = "0:00";
}

function setInitialPositions() {
  divFruta.style.top = "306px";
  divFruta.style.left = "252px";

  charDiv.style.left = "234px";
  charDiv.style.top = "414px";
  charP2Div.style.left = "252px";
  charP2Div.style.top = "414px";

  divPill1.style.top = "18px";
  divPill1.style.left = "18px";

  divPill2.style.top = "18px";
  divPill2.style.left = "468px";

  divPill3.style.top = "522px";
  divPill3.style.left = "18px";

  divPill4.style.top = "522px";
  divPill4.style.left = "468px";

  panguiCords = [
    [234, 198],
    [252, 198],
    [216, 198],
    [270, 198],
  ];

  panguis.map((value, index) => {
    value.style.left = panguiCords[index][0] + "px";
    value.style.top = panguiCords[index][1] + "px";
  });
}

// en el setup
var tid: any;
var timerPillId: any;
var timerFruitId: any;
var tkId: any;
var invincible: boolean = false;
//en el start
function randomMov() {
  /*   //console.log("randomMov");
  //console.log(panguiCords);
  //console.log(panguis); */
  panguis.map((value, index) => {
    //console.log(panguiCords);
    let panguiMoves = [
      [panguiCords[index][1], panguiCords[index][0] + movement],
      [panguiCords[index][1], panguiCords[index][0] - movement],
      [panguiCords[index][1] - movement, panguiCords[index][0]],
      [panguiCords[index][1] + movement, panguiCords[index][0]],
    ].filter((e) => layout[e[0] / 18][e[1] / 18] === ".");
    //console.log(panguiMoves);
    let par1 = Math.floor(Math.random() * panguiMoves.length);
    panguiCords[index][0] = panguiMoves[par1][1];
    panguiCords[index][1] = panguiMoves[par1][0];
    value.style.left = panguiMoves[par1][1] + "px";
    value.style.top = panguiMoves[par1][0] + "px";
    if (!invincible) {
      checkCollision(panguiMoves[par1][1], panguiMoves[par1][0]);
    }
  });
}

function abortTimer() {
  // to be called when you want to stop the timer
  clearInterval(tid);
}

function startTimer() {
  // to be called when you want to start the timer
  tid = setInterval(randomMov, 200);
}

function powerup() {
  console.log("INVENCIBLE");
  powerText.style.visibility = "visible";
  clearTimeout(timerPillId);
  invincible = true;
  timerPillId = setTimeout(endInvincibility, 10000);
}

function eatFruit() {
  clearTimeout(timerFruitId);
  score += 200;
  document.getElementById("score").textContent = score + "";
  divFruta.style.visibility = "hidden";
  boolFruta = false;
  timerFruitId = setTimeout(createFruit, 2500);
}

function endInvincibility() {
  console.log("NORMAL");
  powerText.style.visibility = "hidden";
  invincible = false;
}

function createFruit() {
  let creatingPosition = true;
  let gridX;
  let gridY;

  while (creatingPosition) {
    gridX = getRandomInt(28);
    gridY = getRandomInt(31);

    if (layout[gridY][gridX] == ".") {
      creatingPosition = false;
    }
  }
  xFruta = gridX * 18;
  yFruta = gridY * 18;
  divFruta.style.top = yFruta + "px";
  divFruta.style.left = xFruta + "px";
  divFruta.style.visibility = "visible";
  boolFruta = true;
}

function timeKeeper() {
  tkId = setInterval(addTime, 1000);
}

function addTime() {
  seconds += 1;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
  if (seconds < 10) {
    document.getElementById("minutes:seconds").innerHTML =
      minutes + ":0" + seconds;
  } else {
    document.getElementById("minutes:seconds").innerHTML =
      minutes + ":" + seconds;
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
