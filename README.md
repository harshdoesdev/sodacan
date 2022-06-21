# Sodacan
Hypercasual Game Framework

## Installation
```bash
npm i sodacan
```

## Example
```javascript
game.js
export default class Game {

    // called once for initialization
    init() {
        this.player = {
        x: 0,
        y: 0,
        width: 50,
        height: 50
        };

        console.log('Game Initialized');
    }

    // called everytime when a key is pressed
    keyDown(key) {
        console.log(`Key Pressed: ${key}`);
    }

    // called everytime when a key is released
    keyUp(key) {
        console.log(`Key Released: ${key}`);
    }

    // called every frame to update the game
    update(dt) {
        this.player.x += 50 * dt;
        this.player.y += 50 * dt;
    }

    // called every frame to draw the game
    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

}
```
main.js
```javascript
import { runGame } from 'sodacan';
import Game from './game.js';

const game = new Game();

const config = {
  el: '#app',
  background: 'black'
};

runGame(game, config);
```