//module for game state class
import { canvas, ctx, nextCircleId, cellSize, 
    totalColumns, grid, cellChecks, isPlayerCreated, 
    interacted } from './index.js';

//arrays
import { entities } from './index.js'

export class GameState { 
    constructor(state) {
        this.state = "MAINMENU";
    };

    drawMainMenu() {
        this.state = "MAINMENU"
    // 1. Clear the canvas with a solid color
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the Game Title Text
        ctx.font = "bold 48px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("overstimulated: the game", canvas.width / 2, 150);

    // 3. Draw a "Start Button" Box
        ctx.fillStyle = "#3498db";
        ctx.fillRect(canvas.width / 2 - 100, 250, 200, 50);

    // 4. Draw the Text inside the Button
        ctx.font = "24px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("start?", canvas.width / 2, 282);
    }

    drawDeathMenu() {
        this.state = "DEATHMENU"

        ctx.fillStyle = "#c3290e9b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 48px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("u dided", canvas.width / 2, 150);

        ctx.fillStyle = "#7d858a";
        ctx.fillRect(canvas.width / 2 - 100, 250, 200, 50);

        ctx.font = "24px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("refresh to restart", canvas.width / 2, 282);
    }

    resetGame() {

    }
    
};

function screenShake(multiplier) { //new feature

}

/*
canvas.addEventListener('click', (event) => {
    if (gameState !== "MENU") return;
    
    // Get mouse coordinates relative to canvas
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    // Check if mouse is inside the button bounding box (X: 150-350, Y: 250-300)
    if (mouseX >= 150 && mouseX <= 350 && mouseY >= 250 && mouseY <= 300) {
        if (this.state == "MAINMENU") {
            this.state = "PLAYING";
        }

        if (this.state == "DEATHMENU") {
            this.state = "";
        }
    }
});

*/