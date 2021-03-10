const GRID_SIZE = 21;

export function randomGridPosition() {
    return  {
        x: Math.floor(Math.random() * GRID_SIZE) +1,   
        //Math.random() returns between 0 and 1, not including one
        y: Math.floor(Math.random() * GRID_SIZE) +1
    }
}

export function outsideGrid(position)   {       //no passing through walls
    return  (
        position.x < 1 || position.x > GRID_SIZE 
        || position.y < 1 || position.y > GRID_SIZE
    )
}  
