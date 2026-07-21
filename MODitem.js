//module for item class
import { playerStats, playerStatsOriginal } from "./MODplayer";
import { ctx, canvas } from "./index.js";
import { getRng, entities } from "./index.js";

const p = entities.player[0];

class Item {
    constructor(health, cooldown, speed, damage, dash, misc, duration) {
        this.health = health;
        this.cooldown = cooldown;
        this.speed = speed;
        this.damage = damage;
        this.dash = dash;
        this.misc = misc;
        this.duration = duration;

        this.dropRate = 0;
    }

    getDrop(rate) {
        let num = getRng(0, 100);
        if (num > rate) return false;
        if (num <= rate) return true;
    }

    dropHealth() {

    }

    drawHealthItem() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#a20000';
        ctx.fill();
        ctx.closePath();
    }
}