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

// Game information
const gravity = 1;
let isGameOver = false;
let player = {y: 100, speed: 0, rotation: 0};

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

    const rotateVar = 5.6;

    if (player.rotation <= 5.6) {
        // player.rotation = rotateVar;
        bird.style.transform += `rotate(${rotateVar}deg)`;
    }

    else {
        console.log('Not Spinning')
    }

    // Check if the player presses space or up on the arrow keys
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            player.rotation -= 0.5;
            
            setTimeout(() => {
                player.rotation = 0;
            }, 1000);

            player.speed = -15;
        }
    });

    console.log(player.rotation)

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