// using this to ensure test suite is setup correctly at a basic level

import { sum } from "../foo";

test("basic", () => {
  expect(sum()).toBe(0);
});

test("basic again", () => {
  expect(sum(1, 2)).toBe(3);
});
