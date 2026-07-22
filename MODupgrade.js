//module for upgrade class
import { playerStats, playerStatsOriginal } from "./MODplayer.js";
import { winMenu } from "./MODgameState.js";
import { ctx, canvas } from "./index.js";
class Upgrade {
    constructor(health, cooldown, speed, damage, dash, misc) {
        this.health = health;
        this.cooldown = cooldown;
        this.speed = speed;
        this.damage = damage;
        this.dash = dash;
        this.misc = misc;

        this.upgradeList = [ //DICTIONARY!!!! i learned by random chance
            { name: "Minigun", desc: "-20% Fire Cooldown", effect: {fireCooldown: -4} },
            { name: "Megagun", desc: "+100% Bullet Size", effect: {bulletSize: +3}, requires: "Minigun" },
            { name: "McDonalds world cup meal", desc: "+5 Health", effect: {health: 5} },
            { name: "Chipotle", desc: "-20% Ultimate Cooldown", effect: {ultimateCooldown: -15} }
        ];
    }
};

//upgrades buttons
export const upgradeMenu = document.getElementById('upgradeMenu');
const upgrade1Btn = document.getElementById('upgrade1Btn');
const upgrade2Btn = document.getElementById('upgrade2Btn');
const upgrade3Btn = document.getElementById('upgrade3Btn');

upgrade1Btn.addEventListener('click', () => {
    upgradeMenu.classList.add('hidden');
    winMenu.classList.remove('hidden');
});

upgrade2Btn.addEventListener('click', () => {
    upgradeMenu.classList.add('hidden');
    winMenu.classList.remove('hidden');
});

upgrade3Btn.addEventListener('click', () => {
    upgradeMenu.classList.add('hidden');
    winMenu.classList.remove('hidden');
});
