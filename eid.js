const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const eidSound = new Audio("eid.mp3");
eidSound.loop = true;
eidSound.volume = 1;

let fireworks = [];
let rockets = [];
let showText = false;

class Rocket {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 6;
    }

    update() {

        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {
            createFirework(this.targetX, this.targetY);
            return true;
        }

        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;

        return false;
    }

    draw() {

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y );

        ctx.strokeStyle = "white";
        ctx.linewidth = 4;
        ctx.stroke();
    }
}    
class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.speedX = (Math.random() - 0.5) * 18;
        this.speedY = (Math.random() - 0.5) * 18;

        this.size = Math.random() * 4 + 2;

        this.life = 100;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        this.life--;

        this.size *= 0.96;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createFirework(x, y) {

    const colors = [
        "red",
        "yellow",
        "blue",
        "lime",
        "orange",
        "pink",
        "cyan",
        "purple",
        "white"
    ];

    for (let i = 0; i < 120; i++) {

        fireworks.push(
            new Particle(
                x,
                y,
colors[Math.floor(Math.random() *
     colors.length)]
            )
        );
    }

    setTimeout(() => {
        showText = true;
    }, 1000);
}
function launchRockets() {

    rockets.push(
        new Rocket(
            canvas.width / 2,
            0,
            canvas.width / 2,
            canvas.height / 2
        )
    );
    rockets.push(
        new Rocket(
            canvas.width,
            canvas.height / 2,
            canvas.width / 2,
            canvas.height / 2
        )
    );
    rockets.push(
        new Rocket(
            canvas.width,
            canvas.height / 2,
            canvas.width / 2,
            canvas.height / 2
        )
    );
    rockets.push(
        new Rocket(
            canvas.width,
            canvas.height / 2,
            canvas.width / 2,
            canvas.height / 2
        )
    );
    rockets.push(
        new Rocket(
            canvas.width,
            canvas.height / 2,
            canvas.width / 2,
            canvas.height / 2
        )
    );
} 
function drawText(){
    if (!showText) return;
    
    ctx.font = "80px Arial" ;

    ctx.fillStyle = "white";

    ctx.textAlign = "center";

    ctx.shadowColor = "white";
    ctx.shadowBlur= 30;

    ctx.fillText(
        "Eid Adha Mubarak ✨",
        canvas.width / 2 ,
        canvas.height / 2 

    );

}
function animate(){
    ctx.fillStyle ="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,
canvas.height);
    rockets.forEach((rocket , index)=> {
        rocket.draw();

        const exploded = rocket.update();
        
        if (exploded) {
            rockets.splice(index, 1);
        }

    });
    fireworks.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0 || 
particle.size <= 0.3 ) {
           fireworks.splice(index, 1);
   }
});
    drawText();

    requestAnimationFrame(animate);
}


window.addEventListener("click", () => {
    if (eidSound.paused) {
        eidSound.play();
    }
    launchRockets(); 
});

// تشغيل الألعاب النارية المستمرة كل 700 ملي ثانية
setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * (canvas.height / 2));
}, 700);

// تشغيل دالة الحركة المستمرة
animate();

// ضبط حجم الشاشة عند التكبير والتصغير
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

   

    

    