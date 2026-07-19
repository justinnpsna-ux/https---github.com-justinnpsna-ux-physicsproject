// module for circle classes
import { canvas, ctx, nextCircleId, cellSize, 
    totalColumns, grid, cellChecks, isPlayerCreated,
    interacted } from './index.js';

//arrays
import { entities } from './index.js'

//sound
import { playSound, sfxLimit, sfxPool, sfxPoolIndex } from './index.js';

//bad bullets
import { BadBullet, Bullet } from './MODbullet.js'

export class Circle {
    constructor(x, y, radius, vx, vy, ax, ay, theta, omega, alpha, l, mass) {
        //default
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.theta = theta;
        this.omega = omega;
        this.alpha = alpha;
        this.l = l;  //string length for pendulums?
        this.mass = Math.PI * radius * radius;
        this.health = Math.floor(radius) / 5;

        //technical
        this.isDragged = false;
        this.gridIndex = 0;
        this.id = nextCircleId.id++;
        this.damaged = false;
        this.toDelete = false;
        this.cooldown = 0;

    }

    update(dt) {
        if (this.isDragged) return;
        
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
    }

    drawPendulum() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#769b2d';
        ctx.fill();
        ctx.closePath();
    }

    drawDamage() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#e04b4b';
        ctx.fill();
        ctx.closePath();
    }

    checkBorders() {
        let restitution = 0.8
        if (this.y + this.radius > canvas.height) {
            this.vy *= -restitution
            this.y -= this.y + this.radius - canvas.height
        } else if (this.y - this.radius < 0) {
            this.vy *= -restitution
            this.y += -this.y + this.radius
        }

        if (this.x + this.radius > canvas.width) {
            this.vx *= -restitution
            this.x -= this.x + this.radius - canvas.width 
        } else if (this.x - this.radius < 0) {
            this.vx *= -restitution
            this.x += -this.x + this.radius 
        }
    }

    getGridIndex() {
        let col = Math.floor(this.x / cellSize);
        let row = Math.floor(this.y / cellSize);

        col = Math.max(0, Math.min(col, totalColumns - 1));
        row = Math.max(0, Math.min(row, totalColumns - 1));

        this.gridIndex = col + (row * totalColumns);
  
        if (grid[this.gridIndex]) {
            grid[this.gridIndex].push(this);
        }
    }

    checkCollisions() {
        for (let check of cellChecks) {
        let targetIndex = this.gridIndex + check;

        // pre checks
        if (!grid[targetIndex] || grid[targetIndex].length === 0) continue;
        if (check === 0 && grid[targetIndex].length <= 1) continue;

            for (let o of grid[targetIndex]) {
                if (this.id <= o.id) continue;

                    let dx = this.x - o.x;
                    let dy = this.y - o.y;
                    let distanceSq = (dx * dx) + (dy * dy);

                    if (distanceSq === 0) {
                        this.x += 0.1;
                        continue;
                    }

                    let radiusSq = (this.radius + o.radius) * (this.radius + o.radius);

                    if (distanceSq <= radiusSq) {
                        let distance = Math.sqrt(distanceSq);
                        let offset = (this.radius + o.radius) - distance;
                        let directionX = dx / distance; // (-1, 1)
                        let directionY = dy / distance; // (-1, 1)
                    
                        let totalMass = this.mass + o.mass;
                        let ratioMass = offset / totalMass;

                        this.x += (ratioMass) * (o.mass) * directionX;
                        this.y += (ratioMass) * (o.mass) * directionY;
                        o.x -= (ratioMass) * (this.mass) * directionX;
                        o.y -= (ratioMass) * (this.mass) * directionY

                        let relativeVX = this.vx - o.vx;
                        let relativeVY = this.vy - o.vy;
                        let velAlongNormal = (relativeVX * directionX) + (relativeVY * directionY);

                        // change to dot product
                        if (velAlongNormal < 0) {
                            let restitution = 0.8;
                            let impulse = -(1 + restitution) * velAlongNormal / ((1 / this.mass) +(1 / o.mass));

                            this.vx += (impulse / this.mass) * directionX;
                            this.vy += (impulse / this.mass) * directionY;
                            o.vx -= (impulse / o.mass) * directionX;
                            o.vy -= (impulse / o.mass) * directionY;
                        }
                    }

                        
            }
        }
    }

    swing(dt) {
        this.omega += this.alpha * dt;
        this.theta += this.omega * dt;
        this.x = this.l * Math.sin(this.theta) + 250
        this.y = this.l * Math.cos(this.theta) + 250
    }

    applyForce(fx, fy) {
        this.ax = fx;
        this.ay = fy;
    }

    applyTorque(torque) {
        this.alpha = torque;
    }   
}