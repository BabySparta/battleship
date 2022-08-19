class ship {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.hits = [];
  }

  hit(coord) {
    this.hits.push(coord);
  }

  isSunk() {
    return this.location.sort().toString() === this.hits.sort().toString();
  }
}

export default ship;
