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
