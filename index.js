import { Player } from './Player.js';
import { Exit } from './Exit.js';
import { Field } from './Field.js';
import { Footprint } from './Footprint.js';
import { Item } from './Item.js';
import { Enemy } from './Enemy.js';
import { takePlayerInput } from './input.js';

class Map {
  constructor(width = 5, height = 5, playerX = 0, playerY = height - 1) {
    this.width = width;
    this.height = height;
    this.playerX = playerX;
    this.playerY = playerY;
    this.map = [];
    this.player = {};
    this.#generateMap();
  }
  #generateMap() {
    const mapGrid = [];
    for (let row = 0; row < this.height; row++) {
      mapGrid.push([]);
      for (let col = 0; col < this.width; col++) {
        mapGrid[row].push(new Field());
      }
    }
    // top-right (exit)
    mapGrid[0][mapGrid[0].length - 1] = new Exit('🚩');
    // bottom-left (player)
    this.player = new Player();
    mapGrid[this.height - 1][0] = this.player;
    this.map = mapGrid;
  }
  displayMap() {
    const { atk, def, hp } = this.player.getStats();
    console.log('================================');
    console.log(`Your stats: ATK: ${atk} DEF: ${def} HP: ${hp}`);
    console.log('================================');
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        process.stdout.write(this.map[row][col].icon + '\t');
      }
      process.stdout.write('\n');
    }
  }
  #canPlayerMove(direction) {
    if (direction === 'right') {
      if (this.playerX === this.width - 1) {
        console.log('cannot go right');
        return false;
      }
    }
    if (direction === 'left') {
      if (this.playerX === 0) {
        console.log('cannot go left');
        return false;
      }
    }
    if (direction === 'up') {
      if (this.playerY === 0) {
        console.log('cannot go up');
        return false;
      }
    }
    if (direction === 'down') {
      if (this.playerY === this.height - 1) {
        console.log('cannot go down');
        return false;
      }
    }
    return true;
  }
  #createFight(enemy, player) {
    let roundCounter = 1;
    let currentObject = player;
    const playerStats = player.getStats();
    const enemyStats = enemy.getStats();
    let enemyDamage = enemyStats.atk - playerStats.def;
    let playerDamage = playerStats.atk - enemyStats.def;
    if (enemyDamage <= 0) {
      enemyDamage = 0;
    }
    if (playerDamage <= 0) {
      playerDamage = 0;
    }
    while (true) {
      if (enemyStats.hp > 0 && playerStats.hp > 0) {
        if (currentObject instanceof Player) {
          console.log(`Round ${roundCounter}:`);
          enemyStats.hp -= playerDamage;
          console.log(
            `${player.getName()} deals ${playerDamage} damage. (${enemy.getName()} HP:${
              enemyStats.hp
            })`
          );
          currentObject = enemy;
        } else {
          playerStats.hp -= enemyDamage;
          player.addStats({ hp: -enemyDamage });
          console.log(
            `${enemy.getName()} deals ${enemyDamage} damage. (${player.getName()} HP:${
              playerStats.hp
            })`
          );
          currentObject = player;
          roundCounter++;
        }
        if (enemyStats.hp <= 0) {
          console.log(`${player.getName()} wins!`);
          break;
        } else if (playerStats.hp <= 0) {
          console.log(`${enemy.getName()} wins! The game is over!`);
          process.exit();
        }
      }
    }
  }
  movePlayer(direction) {
    if (!this.#canPlayerMove(direction)) return;
    // create footprint
    this.map[this.playerY][this.playerX] = new Footprint();
    // change coords based on direction
    if (direction === 'right') {
      this.playerX++;
    } else if (direction === 'left') {
      this.playerX--;
    } else if (direction === 'up') {
      this.playerY--;
    } else if (direction === 'down') {
      this.playerY++;
    }
    let newField;
    // check if the field was discovered already
    if (this.map[this.playerY][this.playerX].type === 'discovered') {
      newField = this.player;
      this.map[this.playerY][this.playerX] = newField;
      console.log(`I've been here before, nothing here`);
      return;
    }
    const fieldEvent = this.map[this.playerY][this.playerX].event;
    switch (fieldEvent) {
      case 'none':
        newField = this.player;
        this.map[this.playerY][this.playerX] = newField;
        break;
      case 'monster':
        newField = new Enemy();
        newField.describe();
        this.map[this.playerY][this.playerX] = newField;
        this.#createFight(newField, this.player);
        break;
      case 'item':
        newField = new Item();
        this.map[this.playerY][this.playerX] = newField;
        this.player.addStats(newField.getStats());
        break;
      case 'exit':
        newField = new Exit();
        this.map[this.playerY][this.playerX] = this.player;
        this.displayMap();
        newField.describe();
        process.exit();
    }
    if (fieldEvent !== 'monster') {
      newField.describe();
    }
  }
  async startGame() {
    while (this.player.getStats().hp > 0) {
      this.displayMap();
      const direction = await takePlayerInput();
      switch (direction) {
        case 'up':
          this.movePlayer('up');
          break;
        case 'right':
          this.movePlayer('right');
          break;
        case 'left':
          this.movePlayer('left');
          break;
        case 'down':
          this.movePlayer('down');
          break;
      }
    }
    console.log('---------------------------------------');
  }
}
new Map().startGame();
