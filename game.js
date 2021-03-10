//Simple Snake Game: Jeanette Abell :)
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED,
getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime)  {
    if(gameOver)    {
        if(confirm(`You lost. Press okay to restart.`))  {
            window.location = '/';
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime-lastRenderTime)/1000;       //conversion to milliseconds
    if(secondsSinceLastRender < 1 / SNAKE_SPEED)
        return      //continuous update/render

    //console.log(currentTime);
    lastRenderTime = currentTime;

    //updates whether any play was made, a loss, location, etc.
    update()
    //actually draws the game visually based on update
    draw()
}

window.requestAnimationFrame(main);

function update()   {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw()   {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath()   {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}