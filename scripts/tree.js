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

  #buildTree(array, start, end) {
    if (start > end) return null;

    const middle = start + Math.floor((end - start) / 2);
    const root = new Node(array[middle]);

    root.left = this.#buildTree(array, start, middle - 1);
    root.right = this.#buildTree(array, middle + 1, end);

    return root;
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

  insert(value) {
    if (this.#root === null) this.#root = new Node(value);

    let currentNode = this.#root;
    while (true) {
      if (value === currentNode.data) return;

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  deleteItem(value) {
    let deletedNodeParent;
    let deletedNode;
    let rootBeingDeleted;

    if (this.#root === null) return;

    //Find the node to be deleted and its parent
    let currentNode = this.#root;
    while (true) {
      if (value === currentNode.data) {
        rootBeingDeleted = true;
        deletedNode = currentNode;
        break;
      }

      if (value < currentNode.data) {
        if (currentNode.left === null) return;

        if (currentNode.left.data === value) {
          deletedNodeParent = currentNode;
          deletedNode = currentNode.left;
          break;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        if (currentNode.right === null) return;

        if (currentNode.right.data === value) {
          deletedNodeParent = currentNode;
          deletedNode = currentNode.right;
          break;
        }
        currentNode = currentNode.right;
      }
    }

    // Case 1: deletedNode has no children
    if (deletedNode.left === null && deletedNode.right === null) {
      if (rootBeingDeleted) {
        this.#root = null;
        return;
      }

      if (value < deletedNodeParent.data) {
        deletedNodeParent.left = null;
      } else if (value > deletedNodeParent.data) {
        deletedNodeParent.right = null;
      }

      // Case 2: deletedNode has one child
    } else if ((deletedNode.left !== null) !== (deletedNode.right !== null)) {
      if (rootBeingDeleted) {
        this.#root =
          deletedNode.left !== null ? deletedNode.left : deletedNode.right;
        return;
      }

      if (value < deletedNodeParent.data) {
        deletedNodeParent.left =
          deletedNode.left !== null ? deletedNode.left : deletedNode.right;
      } else if (value < deletedNodeParent.data) {
        deletedNodeParent.right =
          deletedNode.left !== null ? deletedNode.left : deletedNode.right;
      }

      // Case 3: deletedNode has two children
    } else if (deletedNode.left !== null && deletedNode.right !== null) {
      const successor = this.#getSuccessor(deletedNode);
      const successorParent = this.#getSuccessorParent(deletedNode);

      if (rootBeingDeleted) {
        this.#root = successor;
      } else if (value < deletedNodeParent.data) {
        deletedNodeParent.left = successor;
      } else if (value > deletedNodeParent.data) {
        deletedNodeParent.right = successor;
      }

      successor.left = deletedNode.left !== successor ? deletedNode.left : null;
      successor.right =
        deletedNode.right !== successor ? deletedNode.right : null;

      if (successorParent !== deletedNode) successorParent.right = null;
    }
  }

  // Successor is the rightmost node of the left subtree of deletedNode
  #getSuccessor(deletedNode) {
    let currentNode = deletedNode.left;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  #getSuccessorParent(deletedNode) {
    if (deletedNode.left.right === null) return deletedNode;

    let currentNode = deletedNode.left;
    while (currentNode.right !== null) {
      if (currentNode.right.right === null) break;
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  levelOrderForEach(callback) {
    const queue = this.#root !== null ? [this.#root] : [];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode.data);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
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

  height(value, root = undefined) {
    // Initial setup - find the node corresponding to value before performing recursive calls.
    if (root === undefined) {
      root = this.#findNode(value);
      if (root === null) return undefined;
    }

    if (root === null) return -1;

    const leftSubtreeHeight = 1 + this.height(value, root.left);
    const rightSubtreeHeight = 1 + this.height(value, root.right);

    return leftSubtreeHeight > rightSubtreeHeight
      ? leftSubtreeHeight
      : rightSubtreeHeight;
  }

  #findNode(value) {
    let currentNode = this.#root;
    while (currentNode !== null) {
      if (currentNode.data === value) return currentNode;
      currentNode =
        value < currentNode.data ? currentNode.left : currentNode.right;
    }
    return null;
  }

  toSortedArray() {
    const sortedTree = [];
    this.inOrderForEach((value) => sortedTree.push(value));
    return sortedTree;
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
