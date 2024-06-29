// Define the game area
const gameArea = document.querySelector('.gameArea');

// Define the start menu
const menu = document.querySelector('.menu');

// Define the start button
const startButton = document.querySelector('.start');

// Create the background for the game
const background = document.createElement('div');
background.classList.add('background');
gameArea.appendChild(background);

// Create the player/bird in this case
const bird = document.createElement('div');
bird.classList.add('bird');
gameArea.appendChild(bird);

const pipe1 = document.createElement('div');
pipe1.classList.add('topPipe');
gameArea.appendChild(pipe1);

const pipe2 = document.createElement('div');
pipe2.classList.add('bottomPipe');
gameArea.appendChild(pipe2);

// Create the pipes
const pipeGap = 248; // Define the gap between the pipes
const pipeElevation = Math.floor(Math.random() * (gameArea.clientHeight - pipeGap)); // Define the elevation of the pipes

pipe1.style.transform = `translateY(-${pipeElevation - pipeGap}px)`;
pipe2.style.transform = `translateY(-${pipeElevation + pipeGap}px)`;

// Game information
const gravity = 1;
let isGameOver = false;
let player = {y: 100, speed: 0};

const ground = document.createElement('div');
ground.classList.add('ground');
gameArea.appendChild(ground);

function playGame() {
    // Check if the game is over
    if (isGameOver) {
        cancelAnimationFrame(render);
        return;
    }

    // Move the player/bird
    player.speed += gravity;
    player.y += player.speed;
    bird.style.top = player.y + 'px';
    
    // Rotate the bird when falling
    // let deg = 0;
    // if (parseInt(bird.style.top) > 100) {
    //     deg += 1;
    //     console.log(deg);
    //     // bird.style.transform += `rotate(${deg})`;
    // }

    // Check if the player presses space or up on the arrow keys
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            player.speed = -15; // Adjust the jump height as needed
        }
    });

    // Check if the player/bird has hit the ground
    if (player.y + bird.clientHeight >= ground.offsetTop || player.y <= 0) {
        isGameOver = true;
        cancelAnimationFrame(render);
        return;
    }

    // Call the playGame function again
    render = requestAnimationFrame(playGame);
}

// Function to begin the game
function startGame() {
    menu.style.display = 'none';
    render = requestAnimationFrame(playGame);
};

// When the user clicks on the start button to begin the game
startButton.addEventListener('click', startGame);