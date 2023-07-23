import { DIRECTIONS, OBJECT_TYPE } from "./setup";

//  Primitive random movement
export function randomMovement(position, direction, objectExist){
    let dir = direction;
    let nextMovePos = position + dir.movement;
    // Create array from the directions object keys
    const keys = Object.keys(DIRECTIONS);

    // dont want the ghosts to run into other ghosts or into the walls
    while(
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST) 
    ) {
        // get random key from the key array
        const key = keys[Math.floor(Math.random() * keys.length)];
        // Set the next direction
        dir = DIRECTIONS[key];
        // Set the next position
        nextMovePos = position + dir.movement;
    }

    return { nextMovePos,  direction:dir };
}