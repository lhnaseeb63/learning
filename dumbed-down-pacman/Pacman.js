import { OBJECT_TYPE, DIRECTIONS } from "./setup";

class Pacman {
    constructor(speed, startPos){
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerPill = false;

    }
}