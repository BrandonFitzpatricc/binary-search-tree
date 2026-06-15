import { Node } from "./node.js";

class Tree {
  #root;

  constructor(array) {
    // Convert array to set in order to remove duplicates.
    const set = new Set(array);
    array = Array.from(set);
    array.sort((a, b) => a - b);

    this.#root = this.#buildTree(array, 0, array.length - 1);
  }

  get root() {
    return this.#root;
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    const middle = start + Math.floor((end - start) / 2);
    const root = new Node(array[middle]);

    root.left = this.#buildTree(array, start, middle - 1);
    root.right = this.#buildTree(array, middle + 1, end);

    return root;
  }
}

export { Tree };
