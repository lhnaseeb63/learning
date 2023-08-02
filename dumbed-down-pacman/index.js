import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';

// classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';

// Sounds
import soundDot from './assets/sounds/munch.wav';
import soundPill from './assets/sounds/pill.wav';
import soundGameStart from './assets/sounds/game_start.wav';
import soundGameOver from './assets/sounds/death.wav';
import soundGhost from './assets/sounds/eat_ghost.wav';

// DOM Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000; // ms, 10seconds for powerpill powerup
const GLOBAL_SPEED = 80; // ms, for the game loop
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

// Audio
function playAudio(audio){
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

function gameOver(pacman, grid) {
    playAudio(soundGameOver);
    document.removeEventListener('keydown', e => 
        pacman.handleKeyInput(e, gameBoard.objectExist)
    );
    gameBoard.showGameStatus(gameWin);

    // stop the game loop
    clearInterval(timer);

    startButton.classList.remove('hide');
}

function checkCollision(pacman, ghosts){
    // check which ghost pacman collided with 
    const collidedGhost = ghosts.find( ghost => pacman.pos === ghost.pos);

    if(collidedGhost){
        if(pacman.powerPill){
            playAudio(soundGhost);
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collidedGhost.name
            ]);
        collidedGhost.pos = collidedGhost.startPos;
        score += 100;
        } else{
            gameBoard.removeObject(pacman.pos, [
                OBJECT_TYPE.PACMAN
            ]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

function gameLoop(pacman, ghosts){
    // 1. Move Pacman
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts);

     // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  checkCollision(pacman, ghosts);

    //   Check is pacman eats a dot
    if(gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)){
        playAudio(soundDot);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        gameBoard.dotCount--;
        score += 10;
    }

    // Check if pacman eats a power pill
    if(gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)){
        playAudio(soundPill);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
        
        pacman.powerPill = true;
        score += 50;

        // clear out the old power pill timer and set a new one.
        // timers dont stack
        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout( () => (pacman.powerPill = false),
        POWER_PILL_TIME
        );
    }

    // if powerPill, change ghosts to scared mode
    // only want to run this once, not every iteration of game loop
    if(pacman.powerPill !== powerPillActive){
        powerPillActive = pacman.powerPill;
        ghosts.forEach(ghost => ghost.isScared = pacman.powerPill);
    }

    // check if all dots have been eaten
    if (gameBoard.dotCount === 0){
        gameWin = true;
        gameOver(pacman, ghosts);
    }

    // show score
    scoreTable.innerHTML = score;
}

function startGame(){
    playAudio(soundGameStart);
    gameWin = false;
    powerPillActive = false;
    score = 0;
  
    startButton.classList.add('hide');
  
    gameBoard.createGrid(LEVEL);
  
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', (e) =>
      pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );
  
    const ghosts = [
      new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
      new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
      new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
      new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];
  
    // Gameloop
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize game
startButton.addEventListener('click', startGame);