import { DIRECTIONS, OBJECT_TYPE } from "./setup";

class Ghost {
    // movement --> move function that we can give this class. Can swap out for different movement algorithms. 
    constructor(speed = 5, startPos, movement, name) {
        this.name = name;
        this.movement = movement;
        this.startpos = startPos;
        this.pos =- startPos;
        this.dir = DIRECTIONS.ArrowRight;
        this.speed = speed;
        this.timer = 0;
        this.isScared = false;
        this.rotation = false;
    }

    shouldMove(){
        if(this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
        return false;
    }

    getNextMove(objectExist){
        
    }
}