//module for points class
import { canvas, ctx, nextCircleId, cellSize, 
    totalColumns, grid, cellChecks, isPlayerCreated, 
    interacted } from './index.js';

//arrays
import { entities, playSound } from './index.js'

let destroyedCounter = 0;

export class PointsCounter { //depnds on enemy type and keep count by doing filters and seeing the differences
    constructor() {

    }

    updateCounter() {
        document.getElementById('counter').textContent = destroyedCounter;
    }

    handleEnemyDeath() {
        let oldFaller = entities.faller.length;
        entities.faller = entities.faller.filter(o => o.health > 0);
        let newFaller = entities.faller.length;
        destroyedCounter += oldFaller - newFaller;

        let oldEnemies = entities.enemies.length;
        entities.enemies = entities.enemies.filter(o => o.health > 0);
        let newEnemies = entities.enemies.length;
        destroyedCounter += (oldEnemies - newEnemies) * 5;

        if (oldFaller - newFaller > 0) playSound('SFXmimimi.mp3');
        if (oldEnemies - newEnemies > 0) playSound('SFXdead.mp3'); //boss dead sound
    }
}