class Player {
  #stats = { hp: 0, atk: 0, def: 0 };
  constructor(name = 'Player', stats = { hp: 1, atk: 3, def: 2 }, icon = '😎') {
    this.name = name;
    this.#stats = stats;
    this.icon = icon;
  }
  getStats() {
    return { atk: this.#stats.atk, def: this.#stats.def, hp: this.#stats.hp };
  }
  getName() {
    return this.name;
  }
  describe() {
    console.log(`It's safe here`);
  }
  addStats(stats) {
    if (stats.hp) {
      this.#stats.hp += stats.hp;
    }
    if (stats.atk) {
      this.#stats.atk += stats.atk;
    }
    if (stats.def) {
      this.#stats.def += stats.def;
    }
  }
}
export { Player };
