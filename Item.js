import { Field } from './Field.js';

class Item extends Field {
  #stats = { hp: 0, atk: 0, def: 0, name: null };
  constructor(icon = '🏹', stats = { hp: 2, atk: 1, def: 0, name: 'Bow' }) {
    super(icon);
    this.event = 'item';
    this.type = 'discovered';
    this.#stats = stats;
  }
  getStats() {
    return { ...this.#stats };
  }
  describe() {
    console.log(`You found a new item: ${this.icon} (${this.#stats.name})`);
    console.log(
      `You become stronger (+${this.#stats.atk} ATK, +${this.#stats.hp} HP)`
    );
  }
}
export { Item };
