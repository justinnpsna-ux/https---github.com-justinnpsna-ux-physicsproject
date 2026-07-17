//module for levels
import { Player, playerMoveSet } from './MODplayer.js'
import { Circle } from './MODcircle.js'
import { SingleShooter, SpreadShooter, ChargeHitter, LaserShooter } from './MODboss.js'
import { Bullet, BadBullet } from './MODbullet.js'

//arrays
import { player, faller, enemies, bullets, badBullets, swinger } from './index.js'

//rng lol
import { getRng, canvas, ctx } from './index.js'

export class LevelManager {
    constructor() {
        this.currentLevelIndex = 0;

        this.levels = [
            {
                name: "Level 1: thats a lot of balls",
                spawnBall: 10
            },
            {
                name: "Level 2: great... even more balls",
                spawnBall: 10,
                spawnSingleShooter: 1
            },
            {
                name: "Level 3: take a load of these balls",
                spawnBall: 5,
                spawnSingleShooter: 2
            },
            {
                name: "Level 4: wow. EVEN MORE BALLS",
                spawnBall: 5,
                spawnSingleShooter: 1,
                spawnSpreadShooter: 2
            },
            {
                name: "Level 5: we might be cooked",
                spawnBall: 10,
                spawnSingleShooter: 1,
                spawnSpreadShooter: 1,
                spawnChargeHitter: 2
            },
            {
                name: "Level 6: balls galore",
                spawnBall: 5,
                spawnSingleShooter: 3,
                spawnSpreadShooter: 2,
                spawnChargeHitter: 3
            },
            {
                name: "Level 7: is that darth vader",
                spawnBall: 30,
                spawnSingleShooter: 1,
                spawnSpreadShooter: 2,
                spawnChargeHitter: 1,
                spawnLaserShooter: 1
            },
            {
                name: "Level 8: why is everything red",
                spawnBall: 10,
                spawnSingleShooter: 2,
                spawnChargeHitter: 3,
                spawnLaserShooter: 3
            },
            {
                name: "Level 9: u gotta be kidding me",
                spawnBall: 20,
                spawnSpreadShooter: 1,
                spawnChargeHitter: 5,
                spawnLaserShooter: 5
            }


        ]
    }

    startCurrentLevel() {
        for (let [key, value] of Object.entries(this.levels[this.currentLevelIndex])) {
            if (key == "name") { //if name, skip
                console.log(value);
                continue;
            };

            const actualFunction = spawnFunctions[key];

            if (actualFunction) {
                while (value > 0) {
                actualFunction(); 
                value--;
                }
            } else {
                console.warn(`No function found for key: ${key}`);
            }
        }
    }

    getCurrentLevel() {
        console.log(this.levels[this.currentLevelIndex].name);
    }

    nextLevel() {
        if (this.currentLevelIndex == this.levels.length - 1) return false;
        this.currentLevelIndex++;
    }

    getSuccess() {
        if (faller.length > 0 || enemies.length > 0) return;
        console.warn("NICE! next level...");
        this.nextLevel();
        this.startCurrentLevel();
    }
};

const spawnFunctions = {
    spawnBall: spawnBall,                 
    spawnSingleShooter: spawnSingleShooter,
    spawnSpreadShooter: spawnSpreadShooter,
    spawnChargeHitter: spawnChargeHitter,
    spawnLaserShooter: spawnLaserShooter
};

export function spawnBall() {
    let o = new Circle(getRng(0, canvas.width), getRng(0, canvas.height / 2), getRng(15, 25), getRng(-5, 5), getRng(-5, 5), 0, 0);
    faller.push(o);
};

export function spawnSingleShooter() {
    let o = new SingleShooter(getRng(0, canvas.width), getRng(0, canvas.height / 3), 50, 0, 0, 0, 0, 0);
    o.fireBossCooldown = 100;
    enemies.push(o);
};

export function spawnSpreadShooter() {
    let o = new SpreadShooter(getRng(0, canvas.width), getRng(0, canvas.height / 3), 30, 0, 0, 0, 0);
    o.fireBossCooldown = 200;
    enemies.push(o);
};

export function spawnChargeHitter() {
    let o = new ChargeHitter(getRng(0, canvas.width), getRng(0, canvas.height / 3), 60, 0, 0, 0, 0);
    o.fireBossCooldown = 200;
    enemies.push(o);
};

export function spawnLaserShooter() {
    let o = new LaserShooter(getRng(0, canvas.width), getRng(0, canvas.height / 4), 60, 0, 0, 0, 0);
    o.fireBossCooldown = 100;
    enemies.push(o);
};

const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');

openBtn.addEventListener('click', () => {
  levels.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  levels.classList.add('hidden');
});
