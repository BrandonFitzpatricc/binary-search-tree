import { Tree } from "./tree.js";

const tree = new Tree([5, 10, 15, 20, 25, 30, 35, 45]);
console.log(tree.height(35));
tree.prettyPrint();
