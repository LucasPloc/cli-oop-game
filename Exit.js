class Exit {
  constructor(icon = '🚩') {
    this.event = 'exit';
    this.icon = icon;
  }
  describe() {
    console.log(`Congrats you have won!!`);
  }
}
export { Exit };
