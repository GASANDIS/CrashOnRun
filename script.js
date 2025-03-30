// CrashOn Run: Web Edition // ใช้ HTML5 Canvas และ JavaScript

const canvas = document.getElementById("gameCanvas"); const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let player = { x: 50, y: canvas.height / 2, width: 40, height: 40, speed: 5, color: "red" };

let obstacles = []; let gameOver = false;

function drawPlayer() { ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height); }

function spawnObstacle() { let size = Math.random() * 40 + 20; obstacles.push({ x: canvas.width, y: Math.random() * canvas.height, width: size, height: size, speed: 3 + Math.random() * 2 }); }

function drawObstacles() { ctx.fillStyle = "black"; obstacles.forEach(obs => { ctx.fillRect(obs.x, obs.y, obs.width, obs.height); }); }

function update() {
    if (gameOver) return; ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();

    obstacles.forEach(obs => {
        obs.x -= obs.speed;
        if (obs.x + obs.width < 0) {
            obstacles.shift();
        }
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            gameOver = true;
            alert("Crash! Game Over!");
            location.reload();
        }
    });

    requestAnimationFrame(update);

}

document.addEventListener("keydown", (e) => { if (e.key === "ArrowUp" && player.y > 0) player.y -= player.speed * 10; if (e.key === "ArrowDown" && player.y < canvas.height - player.height) player.y += player.speed * 10; });

setInterval(spawnObstacle, 1500); update();

