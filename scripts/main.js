import { Tree } from "./tree.js";

const tree = new Tree([5]);
tree.insert(4);
tree.insert(3);
tree.insert(2);
tree.insert(1);
tree.insert(6);
tree.insert(7);
tree.insert(8);
tree.insert(9);
tree.isBalanced();
tree.prettyPrint();
