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
    expect(tree.toSortedArray()).toEqual([0, 1, 5, 9, 14, 23, 27]);
  });

  test("18 is successfully inserted into a tree with values 14, 9, 27, 1, 23, 5", () => {
    tree.insert(18);
    expect(tree.toSortedArray()).toEqual([1, 5, 9, 14, 18, 23, 27]);
  });

  test("multiple values are successfully inserted into a populated tree", () => {
    tree.insert(10);
    tree.insert(15);
    tree.insert(6);
    tree.insert(20);
    tree.insert(0);

    expect(tree.toSortedArray()).toEqual([
      0, 1, 5, 6, 9, 10, 14, 15, 20, 23, 27,
    ]);
  });

  test("duplicate values are not inserted into a tree", () => {
    tree.insert(5);

    expect(tree.toSortedArray()).toEqual([1, 5, 9, 14, 23, 27]);
  });

  test("values are successfully inserted into an empty tree", () => {
    const tree = new Tree([]);

    tree.insert(2);
    tree.insert(1);
    tree.insert(3);

    expect(tree.toSortedArray()).toEqual([1, 2, 3]);
  });
});

describe("test deleteItem method", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([20, 30, 40, 50, 60, 70]);
  });

  test("items with no children are successfully deleted", () => {
    tree.deleteItem(30);
    tree.deleteItem(50);
    expect(tree.toSortedArray()).toEqual([20, 40, 60, 70]);
  });

  test("items with one child are successfully deleted", () => {
    tree.deleteItem(20);
    expect(tree.toSortedArray()).toEqual([30, 40, 50, 60, 70]);
  });

  test("items with two children are successfully deleted", () => {
    tree.deleteItem(60);
    expect(tree.toSortedArray()).toEqual([20, 30, 40, 50, 70]);
  });

  test("root is successfully deleted when it has no children", () => {
    const tree = new Tree([5]);
    tree.deleteItem(5);
    expect(tree.toSortedArray()).toEqual([]);
  });

  test("root is successfully deleted when it has one child", () => {
    const tree = new Tree([5, 10]);
    tree.deleteItem(5);
    expect(tree.toSortedArray()).toEqual([10]);
  });

  test("root is successfully deleted when it has two children", () => {
    tree.deleteItem(40);
    expect(tree.toSortedArray()).toEqual([20, 30, 50, 60, 70]);
  });

  test("a node in the middle of a long tree is successfully deleted", () => {
    const tree = new Tree([
      20, 30, 40, 50, 60, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250,
    ]);
    tree.deleteItem(190);
    expect(tree.toSortedArray()).toEqual([
      20, 30, 40, 50, 60, 70, 90, 110, 130, 150, 170, 210, 230, 250,
    ]);
  });

  test("root is successfully deleted from a tree with three nodes", () => {
    const tree = new Tree([10, 20, 30]);
    tree.deleteItem(20);
    expect(tree.toSortedArray()).toEqual([10, 30]);
  });

  test("deleteItem method does not break if the value is not found", () => {
    tree.deleteItem(90);
    expect(tree.toSortedArray()).toEqual([20, 30, 40, 50, 60, 70]);
  });

  test("deleteItem method does not break if used on an empty tree", () => {
    const tree = new Tree([]);
    tree.deleteItem(5);
    expect(tree.toSortedArray()).toEqual([]);
  });
});

describe("test levelOrderForEach method", () => {
  test("a populated tree is successfully traversed in level-first order", () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    const array = [];
    tree.levelOrderForEach((value) => array.push(value));
    expect(array).toEqual([50, 30, 70, 20, 40, 60, 80]);
  });

  test("levelOrderForEach method does not break if used on an empty tree", () => {
    const tree = new Tree([]);
    const array = [];
    tree.levelOrderForEach((value) => array.push(value));
    expect(array).toEqual([]);
  });
});

describe("test depth first traversal methods", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
  });

  test("a populated tree is successfully traversed in pre order", () => {
    const array = [];
    tree.preOrderForEach((value) => array.push(value));
    expect(array).toEqual([50, 30, 20, 40, 70, 60, 80]);
  });

  test("a populated tree is successfully traversed in post order", () => {
    const array = [];
    tree.postOrderForEach((value) => array.push(value));
    expect(array).toEqual([20, 40, 30, 60, 80, 70, 50]);
  });

  test("no depth first traversal method breaks if used on an empty tree", () => {
    const tree = new Tree([]);
    tree.inOrderForEach((value) => console.log(value));
    tree.preOrderForEach((value) => console.log(value));
    tree.postOrderForEach((value) => console.log(value));
  });
});

describe("test height method", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([5, 10, 15, 20, 25, 30, 35, 45]);
  });

  test("height of 35 is 1 in the tree created from [5, 10, 15, 20, 25, 30, 35, 45]", () => {
    expect(tree.height(35)).toBe(1);
  });

  test("height of 30 is 2 in the tree created from [5, 10, 15, 20, 25, 30, 35, 45]", () => {
    expect(tree.height(30)).toBe(2);
  });

  test("height of the root node is 3 in the tree created from [5, 10, 25, 20, 25, 30, 35, 45]", () => {
    expect(tree.height(20)).toBe(3);
  });

  test("height method returns undefined when the value is not found", () => {
    expect(tree.height(40)).toBe(undefined);
  });

  test("height method returns undefined when called on an empty tree", () => {
    expect(new Tree([]).height(5)).toBe(undefined);
  });
});

describe("test depth method", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([5, 10, 15, 20, 25, 30, 35, 45]);
  });

  test("depth of 35 is 2 in the tree created from [5, 10, 15, 20, 25, 30, 35, 45", () => {
    expect(tree.depth(35)).toBe(2);
  });

  test("depth of 30 is 1 in the tree created from [5, 10, 15, 20, 25, 30, 35, 45]", () => {
    expect(tree.depth(30)).toBe(1);
  });

  test("depth of the root node is 0 in the tree created from [5, 10, 15, 20, 25, 30, 35, 45]", () => {
    expect(tree.depth(20)).toBe(0);
  });

  test("depth method returns undefined when the value is not found", () => {
    expect(tree.depth(40)).toBe(undefined);
  });

  test("depth method returns undefined when called on an empty tree", () => {
    expect(new Tree([]).depth(5)).toBe(undefined);
  });
});

describe("test isBalanced method", () => {
  test("the tree created from [20, 30, 40, 50, 60, 70, 80] is balanced", () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    expect(tree.isBalanced()).toBe(true);
  });

  test("adding 90 to the above tree keeps it balanced", () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    tree.insert(90);
    expect(tree.isBalanced()).toBe(true);
  });

  test("adding 100 to the above tree makes it unbalanced", () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80, 90]);
    tree.insert(100);
    expect(tree.isBalanced()).toBe(false);
  });

  test("adding 4, 3, 2, 1, 6, 7, 8, 9 to a tree with a root of 5 makes it unbalanced", () => {
    const tree = new Tree([5]);
    tree.insert(4);
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);
    expect(tree.isBalanced()).toBe(false);
  });

  test("the tree created from adding 1-5 one by one is not balanced", () => {
    const tree = new Tree([]);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.isBalanced()).toBe(false);
  });

  test("an empty tree is balanced", () => {
    expect(new Tree().isBalanced()).toBe(true);
  });
});
