class Node {
  #data;
  #left;
  #right;

  constructor(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  get left() {
    return this.#left;
  }

  set left(value) {
    this.#left = value;
  }

  get right() {
    return this.#right;
  }

  set right(value) {
    this.#right = value;
  }
}

export { Node };
