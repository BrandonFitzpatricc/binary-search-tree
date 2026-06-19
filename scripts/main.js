import { Tree } from "./tree.js";

const tree = new Tree(getRandomArray(25));

console.log(tree.prettyPrint());
console.log();

console.log(`Is Balanced: ${tree.isBalanced()}`);
console.log();

console.log("Level Order Traversal:");
tree.levelOrderForEach((value) => console.log(value));
console.log();

console.log("Pre Order Traversal:");
tree.preOrderForEach((value) => console.log(value));
console.log();

console.log("Post Order Traversal:");
tree.postOrderForEach((value) => console.log(value));
console.log();

console.log("In Order Traversal:");
tree.inOrderForEach((value) => console.log(value));
console.log();

tree.insert(105);
tree.insert(110);
tree.insert(115);
tree.insert(120);

console.log(`Is Balanced (after unbalancing): ${tree.isBalanced()}`);
console.log();

tree.rebalance();

console.log(`Is Balanced (after rebalancing): ${tree.isBalanced()}`);
console.log();

console.log(tree.prettyPrint());
console.log();

console.log("Level Order Traversal:");
tree.levelOrderForEach((value) => console.log(value));
console.log();

console.log("Pre Order Traversal:");
tree.preOrderForEach((value) => console.log(value));
console.log();

console.log("Post Order Traversal:");
tree.postOrderForEach((value) => console.log(value));
console.log();

console.log("In Order Traversal:");
tree.inOrderForEach((value) => console.log(value));
console.log();

function getRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(100 * Math.random()));
  }
  return arr;
}
