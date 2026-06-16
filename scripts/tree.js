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

  includes(value) {
    let currentNode = this.#root;
    while (currentNode !== null) {
      if (currentNode.data === value) return true;
      currentNode =
        value < currentNode.data ? currentNode.left : currentNode.right;
    }
    return false;
  }

  inOrderForEach(callback, root = this.#root) {
    if (root === null) return;

    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.#root) {
    if (root === null) return;

    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.#root) {
    if (root === null) return;

    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    const middle = start + Math.floor((end - start) / 2);
    const root = new Node(array[middle]);

    root.left = this.#buildTree(array, start, middle - 1);
    root.right = this.#buildTree(array, middle + 1, end);

    return root;
  }

  prettyPrint(prefix = "", isLeft = true, node = this.#root) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(`${prefix}${isLeft ? "│   " : "    "}`, false, node.right);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(`${prefix}${isLeft ? "    " : "│   "}`, true, node.left);
  }
}

export { Tree };
