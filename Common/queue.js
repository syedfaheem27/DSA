export default class Queue {
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
}
