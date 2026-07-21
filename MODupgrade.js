//module for upgrade class
import { playerStats, playerStatsOriginal } from "./MODplayer";

class Upgrade {
    constructor(health, cooldown, speed, damage, dash, misc) {
        this.health = health;
        this.cooldown = cooldown;
        this.speed = speed;
        this.damage = damage;
        this.dash = dash;
        this.misc = misc;
    }
}
