//modules for aniamtion/physics classes [WIP]
import { canvas, ctx, nextCircleId, cellSize, 
    totalColumns, grid, cellChecks, isPlayerCreated, 
    interacted } from './index.js';

//arrays
import { player, faller, enemies, bullets, badBullets, swinger } from './index.js'

//misc
import { playerMoveSet } from './MODplayer.js';

//sound
import { playSound } from './index.js';

export class Animate { //list all functions needed in animate func
    constructor() {

    }
    
    clearCells() {
        for (let cell of grid) {
            cell.length = 0;
        };
    };

    updatePlayer() {
        for (let i of player) {
            playerMoveSet(i);
            i.update(0.1);
            i.checkBorders();
        
            if (i.damaged && i.cooldown < 3) {
                if (i.damageCooldown <= 0) {
                    i.damageCooldown = 10;
                    i.health--;
                    playSound('SFXow.mp3');
                };

                i.cooldown++;
                i.drawDamage();
            } else {
                i.damaged = false;
                i.drawPlayer();
                i.cooldown = 0;
                i.damageCooldown--;
            }
        }
    }

    updateAll() {
        for (let o of bullets) o.update(0.1);
        for (let o of badBullets) o.update(0.1);
        for (let o of faller) o.update(0.1);
        for (let o of enemies) o.update(0.1);
        for (let o of swinger) { o.applyTorque(-0.098 * Math.sin(o.theta)); o.swing(0.1); }
    }
    
    gridIndexAll() {
        for (let i of player) i.getGridIndex();
        for (let o of faller) o.getGridIndex();
        for (let o of enemies) o.getGridIndex();
        for (let o of swinger) o.getGridIndex();
        for (let o of bullets) o.getGridIndex();
        for (let o of badBullets) o.getGridIndex();
    }

    collisionsAll() {
        for (let i of player) i.checkCollisions();
        for (let o of bullets) o.checkCollisions(true, false);
        for (let o of badBullets) o.checkCollisions(false, true);
        for (let o of faller) o.checkCollisions();
        for (let o of enemies) o.checkCollisions(true);
        for (let o of swinger) o.checkCollisions();
    };

    drawFaller() {
        for (let o of faller) {
            o.checkBorders();
        
            if (o.damaged && o.cooldown < 3) {
                o.cooldown++;
                o.drawDamage();
            } else {
                o.damaged = false;
                o.draw()
                o.cooldown = 0;
            };
        };
    };

    drawSingleShooter() {
        for (let b of enemies) {
            if (!b.singleShooter) continue;
            if (b.fireBossCooldown <= 0) {
                b.shootBossBullet(b, false);
                b.fireBossCooldown = 50;
            };
            if (b.fireBossCooldown > 0) b.fireBossCooldown--;
        
            b.checkBorders();

            if (b.damaged && b.cooldown < 3) {
                b.cooldown++;
                b.drawDamage();
            } else {
                b.damaged = false;
                b.drawBoss()
                b.cooldown = 0;
            };
        };
    };
    
    drawSpreadShooter() {
        for (let b of enemies) {
            if (!b.spreadShooter) continue;
            if (b.fireBossCooldown <= 0) {
                b.shootBossBullet(b, false);
                b.fireBossCooldown = 500;
            };
            if (b.fireBossCooldown > 0) b.fireBossCooldown--;
            
            b.checkBorders();

            if (b.damaged && b.cooldown < 3) {
                b.cooldown++;
                b.drawDamage();
            } else {
                b.damaged = false;
                b.drawBoss()
                b.cooldown = 0;
            };
        };
    };

    drawChargeHitter() {
        for (let b of enemies) {
            if (!b.chargeHitter) continue;
            if (b.fireBossCooldown <= 0) {
                b.shootBossBullet(b, false);
                b.fireBossCooldown = 150;
            };

            if (b.fireBossCooldown > 0) { 
                b.vx /= 1.015;
                b.vy /= 1.015;
                b.fireBossCooldown--;
            };
            
            b.checkBorders();

            if (b.damaged && b.cooldown < 3) {
                b.cooldown++;
                b.drawDamage();
            } else {
                b.damaged = false;
                b.drawBoss()
                b.cooldown = 0;
            };
        };
    };

    drawBullets() {
        for (let b of bullets) {
            if (!b.ultimate) {b.checkBorders()}; //only ultimate doesnt care about borders
            b.drawBullets();
        };

        for (let b of badBullets) {
            b.checkBorders(); 
            b.drawBadBullets();
        };
    };

    drawSwinger() {
        for (let o1 of swinger) {
            o1.checkBorders();
            o1.drawPendulum();
        };
    };

    filterBullets() { //doesnt work bcs its using vars from another module
        bullets = bullets.filter(b => b.toDelete == false && Math.abs(b.vx) + Math.abs(b.vy) >= 100);
        badBullets = badBullets.filter(b => b.toDelete == false && Math.abs(b.vx) + Math.abs(b.vy) >= 10);
    };
}

/*
function animate() {
    //if (singleshooter.length === 0 && faller.length === 0) {window.alert("yaou winN!!!"); };
    bullets = bullets.filter(b => b.toDelete == false && Math.abs(b.vx) + Math.abs(b.vy) >= 100);
    badBullets = badBullets.filter(b => b.toDelete == false && Math.abs(b.vx) + Math.abs(b.vy) >= 10);

    //point system
    let oldFaller = faller.length;
    faller = faller.filter(o => o.health > 0);
    let newFaller = faller.length;
    destroyedCounter += oldFaller - newFaller;

    let oldBoss = singleshooter.length;
    singleshooter = singleshooter.filter(o => o.health > 0);
    let newBoss = singleshooter.length;
    destroyedCounter += (oldBoss - newBoss) * 5;

    let oldBoss2 = spreadshooter.length;
    spreadshooter = spreadshooter.filter(o => o.health > 0);
    let newBoss2 = spreadshooter.length;
    destroyedCounter += (oldBoss2 - newBoss2) * 5;

    document.getElementById('counter').textContent = destroyedCounter;

    if (player[0].health <= 0 && !immortal) { window.alert("u dided lol....") }
    document.getElementById('playerhealth').textContent = player[0].health;

    if (oldFaller - newFaller > 0) playSound('SFXmimimi.mp3');
    if (oldBoss - newBoss > 0 || oldBoss2 - newBoss2 > 0) playSound('SFXdead.mp3'); // singleshooter dead sound

    requestAnimationFrame(animate);
};
*/