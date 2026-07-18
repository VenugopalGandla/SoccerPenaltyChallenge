# Soccer Penalty Challenge ⚽

A simple, colorful penalty-shootout browser game made for young players. It uses only HTML, CSS, and vanilla JavaScript.

## How to Play

1. Open `index.html` in a web browser.
2. Choose where to shoot:
   - **Left**
   - **Center**
   - **Right**
3. The goalkeeper randomly dives left, stays in the center, or dives right.
4. If the goalkeeper picks the same direction, the shot is **SAVED!**
5. If the goalkeeper picks a different direction, it is a **GOAL!**
6. You get 10 shots. Try to score as many goals as possible.
7. Select **Play Again** after the final score to start a new game.

## Controls

| Action | Button | Keyboard |
| --- | --- | --- |
| Shoot left | **← Left** | Left Arrow |
| Shoot center | **↓ Center** | Down Arrow |
| Shoot right | **→ Right** | Right Arrow |
| Turn sound on or off | Sound button | — |

## Run the Game

No installation or build step is needed.

### Quickest method

Double-click `index.html` to open it in your default browser.

### Run with a local server

From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Features

- 10-shot penalty challenge
- Animated soccer ball and goalkeeper
- Random saves and goals
- Score and remaining-shot counters
- Mouse, touch, and keyboard controls
- Browser-generated goal and save sounds
- Mute button
- Responsive layout for computers, tablets, and phones
- No advertisements, tracking, accounts, external APIs, or libraries

## Project Files

- `index.html` — game page and structure
- `style.css` — colors, layout, responsive design, and animations
- `game.js` — game rules, scoring, controls, sounds, and restart behavior

## Technology

- HTML
- CSS
- Vanilla JavaScript
