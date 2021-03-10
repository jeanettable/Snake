import { getInputDirection } from "./input.js";
export const SNAKE_SPEED = 4.5;

const snakeBody = [         //to hold x,y positions on grid
    { x: 11, y: 11 },       //starts at center
 ];  

 let newSegments = 0;   

export function update()   {
    addSegments();      //call to grow snake if food eaten?

    const inputDirection = getInputDirection();
    for(let i=snakeBody.length - 2; i>= 0; i--) {
        snakeBody[i+1] = { ...snakeBody[i] };
    }
    //snake movements
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard)   {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount)    {
    newSegments += amount;
    //SNAKE_SPEED += (.25 * SNAKE_SPEED);  //speed up not working here 
}

//checks for space occupancy by body segments
export function onSnake(position,  {  ignoreHead = false   } = {} ) {
    return snakeBody.some((segment, index) =>    {    //helper func
        if(ignoreHead && index === 0) return false;
            
        return equalPositions(segment, position)
    })
}

//if true, indicates food eaten, also used for intersection check
function equalPositions(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y)  
}

function addSegments()  {
    for(let i=0; i<newSegments; i++)    {
        //adds snake unit to tail of snake, use 'spreading'
        snakeBody.push( { ...snakeBody[snakeBody.length-1]} );
    }

    newSegments = 0;       //reset to zero, so only grows in increments of one
}

export function getSnakeHead()  {       //returns position of snake's head
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}