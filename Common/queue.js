class Queue {
  constructor() {
    this.arr = [];
    this.front = 0;
    this.back = -1;
  }

  add(el) {
    this.arr.push(el);
    this.back++;
  }

  remove() {
    if (this.isEmpty()) return;

    let el = this.arr[this.front++];

    return el;
  }

  isEmpty() {
    return this.front > this.back;
  }

  get length() {
    if (this.isEmpty()) return 0;
    return this.back - this.front + 1;
  }
}
module.exports = Queue;
