class Field {
  #icons = ['🌲', '🌳', '🌴'];
  #events = ['none', 'item', 'monster'];
  #eventProbability = [6, 3, 3]; // event weight

  constructor(icon, type = 'hidden', event) {
    if (!icon) {
      this.icon = this.#icons[this.#generateRandomNumber(this.#icons)];
    } else {
      this.icon = icon;
    }
    if (!event) {
      const events = this.#createEventsBasedOnWeight();
      this.event = events[this.#generateRandomNumber(events)];
    } else {
      this.event = event;
    }
    this.type = type;
  }
  #generateRandomNumber(arr) {
    return Math.floor(Math.random() * arr.length);
  }
  #createEventsBasedOnWeight() {
    const events = [];
    for (let i = 0; i < this.#eventProbability.length; i++) {
      let repeatNumber = this.#eventProbability[i];
      while (repeatNumber > 0) {
        events.push(this.#events[i]);
        repeatNumber--;
      }
    }
    return events;
  }
  describe() {
    console.log(`Nothing happened`);
  }
}
export { Field };
