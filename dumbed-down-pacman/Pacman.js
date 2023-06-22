import { OBJECT_TYPE, DIRECTIONS } from "./setup";

class Pacman {
    constructor(speed, startPos){
        this.pos = startPos;
        this.speed = speed;
        // dir is how we will reference the directions object in setup.js
        this.dir = null;
        // timer affects speed. 
        this.timer = 0;
        this.powerPill = false;
        // pacman can rotate but the ghosts can't
        this.rotation = true;
    }

    // check to see if we can move pacman or not. don't want him moving if player hasn't hit an arrow key
    shouldMove(){
        // don't move initially
        if(!this.dir) return false;

        if(this.timer === this.speed){
            this.timer = 0;
            return true;
        }

        this.timer++;
    }

    getNextMove(objectExist){
        // this.dir.movement example: ArrowLeft.movement --> -1
        let nextMovePos = this.pos + this.dir.movement;

        // if we collide with a wall or try to enter the ghost lair do nothing
        if(
            objectExist(nextMovePos, OBJECT_TYPE.WALL) 
            || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ){
            nextMovePos = this.pos;
        }

        return { nextMovePos, direction: this.dir };

    }

    makeMove(){
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd };
    }

    setNewPos(nextMovePos){
        this.pos = nextMovePos;
    }

    handleKeyInput(e, objectExist){
        let dir;

        // arrowpad keys
        if(e.keyCode >= 37 && e.keyCode <= 40){
            // e.Key can be ArrowLeft, ArrowRight, ArrowUp, ArrowDown just like in our object
            dir = DIRECTIONS[e.key]
        } else{
            return;
        }

        /*
            Let's say the user is going left, then presses the up key and there's a wall. 
            We don't want pacman to stop, then go up, then stop at the wall. 
            We want pacman to continue to move and only change direction at an intersection in the grid. 
        */
        const nextMovePos = this.pos + dir.movement;
        if(objectExist(nextMovePos, OBJECT_TYPE.WALL) 
        || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) return;
        this.dir = dir;
    }

} // Pacman

export default Pacman;