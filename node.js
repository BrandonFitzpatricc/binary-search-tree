class Node {
  #value;
  #leftChild;
  #rightChild;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get leftChild() {
    return this.#leftChild;
  }

  set leftChild(value) {
    this.#leftChild = value;
  }

  get rightChild() {
    return this.#rightChild;
  }

  set rightChild(value) {
    this.#rightChild = value;
  }
}

export { Node };
