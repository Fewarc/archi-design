import { cn } from "../../src/utils/styleUtils";

describe("test cn function", () => {
  test("build className", () => {
    expect(cn("class1", {"class2": true}, "class3")).toBe("class1 class2 class3");
  })
})