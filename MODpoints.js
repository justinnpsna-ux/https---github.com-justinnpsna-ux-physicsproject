//module for points class
import { canvas, ctx, nextCircleId, cellSize, 
    totalColumns, grid, cellChecks, isPlayerCreated, 
    interacted } from './index.js';

//arrays
import { player, faller, enemies, bullets, badBullets, swinger } from './index.js'

let destroyedCounter = 0;

//this doesnt work lol cuz were filtering arrays from different module
//dont use this mod




export class PointsCounter { //depnds on enemy type and keep count by doing filters and seeing the differences
    constructor() {

    }

    updateCounter() {
        document.getElementById('counter').textContent = destroyedCounter;
    }

    fallerCounter() {
        let oldFaller = faller.length;
        faller = faller.filter(o => o.health > 0);
        let newFaller = faller.length;
        destroyedCounter += oldFaller - newFaller;
    }

    singleshooterCounter() {
        let oldBoss = singleshooter.length;
        singleshooter = singleshooter.filter(o => o.health > 0);
        let newBoss = singleshooter.length;
        destroyedCounter += (oldBoss - newBoss) * 5;
    }

    spreadshooterCounter() {
        let oldBoss2 = spreadshooter.length;
        spreadshooter = spreadshooter.filter(o => o.health > 0);
        let newBoss2 = spreadshooter.length;
        destroyedCounter += (oldBoss2 - newBoss2) * 5;
    }
}