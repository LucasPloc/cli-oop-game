class Footprint {
  constructor(icon = '👣') {
    this.type = 'discovered';
    this.icon = icon;
  }
  describe() {
    console.log(`This place looks familiar...`);
  }
}
export { Footprint };
