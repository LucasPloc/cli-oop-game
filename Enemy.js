import { Field } from './Field.js';

class Enemy extends Field {
  #stats = { hp: 0, atk: 0, def: 0 };
  constructor(icon = '🦇', stats = { hp: 5, atk: 3, def: 1 }, name = 'Bat') {
    super(icon);
    this.event = 'enemy';
    this.type = 'discovered';
    this.name = name;
    this.#stats = stats;
  }
  getStats() {
    return { atk: this.#stats.atk, def: this.#stats.def, hp: this.#stats.hp };
  }
  getName() {
    return this.name;
  }
  describe() {
    console.log(`You encountered an enemy: ${this.icon} (${this.name})`);
    console.log(
      `Enemy stats: ATK ${this.#stats.atk} DEF ${this.#stats.def} HP ${
        this.#stats.hp
      } `
    );
    console.log('The fight begins...');
  }
}

export { Enemy };
