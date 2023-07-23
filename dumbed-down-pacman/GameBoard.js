import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./setup";

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        // array with all the positions
        this.grid = [];
        // actual divs in the DOM
        this.DOMGrid = DOMGrid;
    }

    // is the game over or did we win?
    showGameStatus(gameWin) {
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'WIN' : 'GAME OVER!'}`
        this.DOMGrid.append(div);
    }

    // creating the grid
    createGrid(level) {
        // wiping everything
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid.innerHTML = '';
        // creating the grid in the DOM
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;

        level.forEach(square => {
            const div = document.createElement('div');
            // adding 2 classes to each div. Square and the approriate class for each square type. 
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText = `width: ${CELL_SIZE}px; height:${CELL_SIZE}px;`
            this.DOMGrid.appendChild(div);
            // put in array because it will be easier to access divs
            this.grid.push(div);

            if(CLASS_LIST[square] === OBJECT_TYPE.DOT) {
                this.dotCount++;
            }

        });
    } // createGrid function 

    // takes in position and classes (can feed as array) we want to add to the grid
    addObject(pos, objects) {
        this.grid[pos].classList.add(...objects);
    }
    removeObject(pos, objects) {
        this.grid[pos].classList.remove(...objects);
    }

    /* see if class exists on the grid at specified position 
        Uses the 'this' keyword, so we need to bind it to make
        sure that it is setting the variable on the 
        GameBoard class instance (gameBoard). 
        Or we can turn the function into an arrow function.
    */
    objectExist = (pos, object) => {
        return this.grid[pos].classList.contains(object);
    }

    // to rotate pacman
    rotateDiv(pos, deg){
        this.grid[pos].style.transform = `rotate(${deg}deg)`;
    }

    moveCharacter(character){
        if (character.shouldMove()){
            const { nextMovePos, direction } = character.getNextMove(
                this.objectExist
                // this.objectExist.bind(this)
            );
            const { classesToRemove, classesToAdd } = character.makeMove();

            // should only rotate if next move is valid at an intersection
            if (character.rotation && nextMovePos !== character.pos){ 
                this.rotateDiv( nextMovePos, character.dir.rotation);
                // reset position of previous div, otherwise ghosts would rotate
                // when they reach that div
                this.rotateDiv(character.pos, 0);
            } //only applicable to pacman

            // move by removing and adding classes
            this.removeObject(character.pos, classesToRemove);
            this.addObject(nextMovePos, classesToAdd);

            character.setNewPos(nextMovePos, direction);
        }
    }

    /*
        Static methods can be called without instantiating a class. 
        By calling the function below, it instantiates an instance of the class.
        Can instantiate in the index.js file but we would also have to call the 
        createGrid method there. 
        Just cleaner to call the one method to do the two steps for us. 
    */
    static createGameBoard(DOMGrid, level){
        // create instance of class
        const board = new this(DOMGrid);
        board.createGrid(level);
        return board;
    }

} // Gameboard class

export default GameBoard;
