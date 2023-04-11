import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import mapp from "./map.png";
import m_01 from "./images/m_01.png";
import f_01 from "./images/f_01.png";
import fruit from "./images/Fruit.png";
import pwPill from "./images/PowerPill.png";
import panguiImg from "./images/Pangui.png";
import resButtonImg from "./images/RestartX.png";
import startButtonImg from "./images/BotonStartAzul.png";
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

const gameDiv = document.getElementById("game");
const charDiv = document.getElementById("character");
const charP2Div = document.getElementById("characterP2");
const button = document.getElementById("button");
const resButton = document.getElementById("resButton");
const gameOver = document.getElementById("gameOver");
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
  console.log(`WASD key pressed: ${wasdKey}`);
});

arrowKeyObservable.subscribe((arrowKey) => {
  // handleKeys(arrowKey);
  console.log(`Arrow key pressed: ${arrowKey}`);
});

// function handleKeys(keypress: string) {
//   switch (keypress) {
//     case "ArrowRight":
//       if (checkMove(1, x, y)) {
//         if (x == 486) {
//           x = 0;
//         } else {
//           x += movement;
//         }
//         charDiv.style.left = x + "px";
//         afterPlayerMovement(x, y);
//       }
//       break;
//     case "ArrowLeft":
//       if (checkMove(2, x, y)) {
//         if (x == 0) {
//           x = 486;
//         } else {
//           x -= movement;
//         }
//         charDiv.style.left = x + "px";
//         afterPlayerMovement(x, y);
//       }
//       break;
//     case "ArrowUp":
//       if (checkMove(3, x, y)) {
//         y -= movement;
//         charDiv.style.top = y + "px";
//         afterPlayerMovement(x, y);
//       }
//       break;
//     case "ArrowDown":
//       if (checkMove(4, x, y)) {
//         y += movement;
//         charDiv.style.top = y + "px";
//         afterPlayerMovement(x, y);
//       }
//       break;
//     case "KeyD":
//       if (checkMove(1, x2, y2)) {
//         if (x2 == 486) {
//           x2 = 0;
//         } else {
//           x2 += movement;
//         }
//         charP2Div.style.left = x2 + "px";
//         afterPlayerMovement(x2, y2);
//       }
//       break;
//     case "KeyA":
//       if (checkMove(2, x2, y2)) {
//         if (x2 == 0) {
//           x2 = 486;
//         } else {
//           x2 -= movement;
//         }
//         charP2Div.style.left = x2 + "px";
//         afterPlayerMovement(x2, y2);
//       }
//       break;
//     case "KeyW":
//       if (checkMove(3, x2, y2)) {
//         y2 -= movement;
//         charP2Div.style.top = y2 + "px";
//         afterPlayerMovement(x2, y2);
//       }
//       break;
//     case "KeyS":
//       if (checkMove(4, x2, y2)) {
//         y2 += movement;
//         charP2Div.style.top = y2 + "px";
//         afterPlayerMovement(x2, y2);
//       }
//       break;
//     default:
//       //console.log(x,y);
//       //console.log(x2,y2);
//       break;
//   }
//   /* afterPlayerMovement(x, y);
//   afterPlayerMovement(x2, y2); */
// }

// type CoordinatesPlayer = {
//   x: number;
//   y: number;
// };

// function afterPlayerMovement(props: CoordinatesPlayer) {
//   eat(props);
//   panguiCords.map((cords) => {
//     if (cords[0] == props.x && cords[1] == props.y) {
//       console.log("PX");
//       endGame();
//     }
//   });
// }

// function eat(props: CoordinatesPlayer) {
//   let ateFruit = checkForFruit(props);
//   if (ateFruit) {eatFruit();}

//   let pill = checkForPill(x, y);
//   if (pill != 0) {eatPill(pill);}
// }
// function checkForFruit(props: CoordinatesPlayer){
//   if (boolFruta) {
//     if (props.x == xFruta && props.y == yFruta) {
//       return true;
//     }
//     return false;
//   }
//   return false;
// }

// function checkForPill(props: CoordinatesPlayer){
//   if (props.x == 18 && props.y == 18 && Pill1) {
//     return 1;
//   } else if (props.x == 468 && props.y == 18 && Pill2) {
//     return 2;
//   } else if (props.x == 18 && props.y == 522 && Pill3) {
//     return 3;
//   } else if (props.x == 468 && props.y == 522 && Pill4) {
//     return 4;
//   }
//   return 0;
// }

// function checkMove(input: number, x: number, y: number) {
//   if (start == false) {
//     return false;
//   }

//   let new_x;
//   let new_y;
//   let grid_x;
//   let grid_y;
//   let grid_char;

//   if (input == 1) {
//     //RIGHT
//     new_y = y;

//     if (x == 486) {
//       new_x = 0;
//     } else {
//       new_x = x + 18;
//     }
//   } else if (input == 2) {
//     //LEFT
//     new_y = y;

//     if (x == 0) {
//       new_x = 486;
//     } else {
//       new_x = x - 18;
//     }
//   } else if (input == 3) {
//     //UP
//     new_y = y - 18;
//     new_x = x;
//   } else if (input == 4) {
//     //DOWN
//     new_y = y + 18;
//     new_x = x;
//   }

//   grid_y = new_y / 18;
//   grid_x = new_x / 18;

//   grid_char = layout[grid_y][grid_x];

//   if (grid_char == ".") {
//     return true;
//   }
//   return false;
// }
