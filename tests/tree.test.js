import { Tree } from "../scripts/tree.js";

describe("test includes method", () => {
  const tree = new Tree([14, 9, 27, 1, 23, 5]);

  test("includes returns true if a parent node contains the value", () => {
    expect(tree.includes(23)).toBe(true);
  });

  test("includes returns true if the root node contains the value", () => {
    expect(tree.includes(9));
  });

  test("includes returns true if a leaf node contains the value", () => {
    expect(tree.includes(5));
  });

  test("includes returns false if the value is not found", () => {
    expect(tree.includes(7)).toBe(false);
  });

  test("includes always returns false when called on an empty tree", () => {
    expect(new Tree([]).includes(5)).toBe(false);
  });
});

describe("test insert method", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([14, 9, 27, 1, 23, 5]);
  });

  test("0 is successfully inserted into a tree with values 14, 9, 27, 1, 23, 5", () => {
    tree.insert(0);
    const sortedTree = [];
    tree.inOrderForEach((value) => sortedTree.push(value));
    expect(sortTree(tree)).toEqual([0, 1, 5, 9, 14, 23, 27]);
  });

  test("18 is successfully inserted into a tree with values 14, 9, 27, 1, 23, 5", () => {
    tree.insert(18);
    expect(sortTree(tree)).toEqual([1, 5, 9, 14, 18, 23, 27]);
  });

  test("multiple values are successfully inserted into a populated tree", () => {
    tree.insert(10);
    tree.insert(15);
    tree.insert(6);
    tree.insert(20);
    tree.insert(0);

    expect(sortTree(tree)).toEqual([0, 1, 5, 6, 9, 10, 14, 15, 20, 23, 27]);
  });

  test("duplicate values are not inserted into a tree", () => {
    tree.insert(5);

    expect(sortTree(tree)).toEqual([1, 5, 9, 14, 23, 27]);
  });

  test("values are successfully inserted into an empty tree", () => {
    const emptyTree = new Tree([]);

    emptyTree.insert(2);
    emptyTree.insert(1);
    emptyTree.insert(3);

    expect(sortTree(emptyTree)).toEqual([1, 2, 3]);
  });
});

function sortTree(tree) {
  const sortedTree = [];
  tree.inOrderForEach((value) => sortedTree.push(value));
  return sortedTree;
}
