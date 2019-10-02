export class Postion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isInSize(size) {
    return this.x >= 0 && this.y >= 0 && this.x < size && this.y < 20;
  }
}

export class Winner {
  constructor(state) {
    this.state = state;
    this.startIndex = undefined;
    this.endIndex = undefined;
  }

  calRange() {
    if (this.startIndex === undefined) return [];
    if (this.endIndex === undefined) return [];
    if (!this.endIndex instanceof Postion) return [];
    if (!this.startIndex instanceof Postion) return [];
    let res = [];
    if (this.startIndex.x === this.endIndex.x) {
      let x = this.startIndex.x;
      let start = Math.min(this.startIndex.y, this.endIndex.y);
      let end = Math.max(this.startIndex.y, this.endIndex.y);
      for (let i = start; i <= end; i++) {
        res.push(new Postion(x, i));
      }
    } else if (this.startIndex.y === this.endIndex.y) {
      let y = this.startIndex.y;
      let start = Math.min(this.startIndex.x, this.endIndex.x);
      let end = Math.max(this.startIndex.x, this.endIndex.x);
      for (let i = start; i <= end; i++) {
        res.push(new Postion(i, y));
      }
    } else {
      let start = Math.min(this.startIndex.x, this.endIndex.x);
      let end = Math.max(this.startIndex.x, this.endIndex.x);
      let mode = this.startIndex.y < this.endIndex.y ? 1 : -1;
      let y = this.startIndex.y;
      for (let i = start; i <= end; i++) {
        res.push(new Postion(i, y));
        y += mode;
      }
    }
    return res;
  }
}
