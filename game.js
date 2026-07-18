"use strict";

// Find the game parts in the page once so we can use them throughout the game.
const scoreDisplay = document.querySelector("#score");
const shotsDisplay = document.querySelector("#shots-left");
const resultDisplay = document.querySelector("#result");
const ball = document.querySelector("#ball");
const goalkeeper = document.querySelector("#goalkeeper");
const penaltyPlayer = document.querySelector("#penalty-player");
const directionButtons = [...document.querySelectorAll(".direction")];
const gameOverScreen = document.querySelector("#game-over");
const finalScoreDisplay = document.querySelector("#final-score");
const playAgainButton = document.querySelector("#play-again");
const muteButton = document.querySelector("#mute-button");
const muteIcon = document.querySelector("#mute-icon");
const muteLabel = document.querySelector("#mute-label");

const directions = ["left", "center", "right"];
let score = 0;
let shotsLeft = 10;
let animationRunning = false;
let isMuted = false;
let audioContext = null;

// Browser-made tones mean the game needs no downloaded music or sound files.
function playTone(frequency, duration, type = "sine", delay = 0) {
  if (isMuted) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  audioContext ||= new AudioContext();
  if (audioContext.state === "suspended") audioContext.resume();

  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  const start = audioContext.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  volume.gain.setValueAtTime(0.001, start);
  volume.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
  volume.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(volume);
  volume.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
}

function playGoalSound() {
  playTone(523, 0.16, "sine");
  playTone(659, 0.16, "sine", 0.13);
  playTone(784, 0.3, "sine", 0.26);
}

function playSaveSound() {
  playTone(180, 0.2, "square");
  playTone(130, 0.28, "square", 0.16);
}

// Turn all shot buttons on or off together while the players are moving.
function setButtonsDisabled(disabled) {
  directionButtons.forEach((button) => { button.disabled = disabled; });
}

// Pick one of the three goalkeeper moves with an equal random chance.
function getRandomDirection() {
  return directions[Math.floor(Math.random() * directions.length)];
}

// Run one complete penalty shot after a click or keyboard press.
function takeShot(playerDirection) {
  if (animationRunning || shotsLeft <= 0 || !directions.includes(playerDirection)) return;

  animationRunning = true;
  setButtonsDisabled(true);
  resultDisplay.textContent = "Here it goes...";
  resultDisplay.className = "result";

  const keeperDirection = getRandomDirection();
  ball.className = `ball shoot-${playerDirection}`;
  penaltyPlayer.className = `penalty-player kick-${playerDirection}`;
  goalkeeper.className = `goalkeeper dive-${keeperDirection}`;

  window.setTimeout(() => {
    const wasSaved = playerDirection === keeperDirection;
    shotsLeft -= 1;

    if (wasSaved) {
      resultDisplay.textContent = "SAVED!";
      resultDisplay.className = "result saved";
      playSaveSound();
    } else {
      score += 1;
      resultDisplay.textContent = "GOAL!";
      resultDisplay.className = "result goal";
      playGoalSound();
    }

    scoreDisplay.textContent = score;
    shotsDisplay.textContent = shotsLeft;

    window.setTimeout(() => {
      ball.className = "ball";
      penaltyPlayer.className = "penalty-player";
      goalkeeper.className = "goalkeeper";

      if (shotsLeft === 0) {
        finalScoreDisplay.textContent = score;
        gameOverScreen.hidden = false;
        playAgainButton.focus();
      } else {
        animationRunning = false;
        setButtonsDisabled(false);
        resultDisplay.textContent = "Choose your shot!";
        resultDisplay.className = "result";
      }
    }, 850);
  }, 780);
}

directionButtons.forEach((button) => {
  button.addEventListener("click", () => takeShot(button.dataset.direction));
});

// Arrow keys give the same choices as the three big buttons.
document.addEventListener("keydown", (event) => {
  const keyDirections = { ArrowLeft: "left", ArrowDown: "center", ArrowRight: "right" };
  if (keyDirections[event.key]) {
    event.preventDefault();
    takeShot(keyDirections[event.key]);
  }
});

// Reset every score and visual so a brand-new ten-shot game can begin.
function resetGame() {
  score = 0;
  shotsLeft = 10;
  animationRunning = false;
  scoreDisplay.textContent = score;
  shotsDisplay.textContent = shotsLeft;
  resultDisplay.textContent = "Choose your shot!";
  resultDisplay.className = "result";
  ball.className = "ball";
  penaltyPlayer.className = "penalty-player";
  goalkeeper.className = "goalkeeper";
  gameOverScreen.hidden = true;
  setButtonsDisabled(false);
  directionButtons[1].focus();
}

playAgainButton.addEventListener("click", resetGame);

muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  muteButton.setAttribute("aria-pressed", String(isMuted));
  muteButton.setAttribute("aria-label", isMuted ? "Turn sounds on" : "Mute sounds");
  muteIcon.textContent = isMuted ? "🔇" : "🔊";
  muteLabel.textContent = isMuted ? "Sound Off" : "Sound On";
});
