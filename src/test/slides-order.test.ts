import { describe, expect, it } from "vitest";

import { SLIDES } from "@/lib/slides";

describe("presentation order", () => {
  it("has 10 pages", () => {
    expect(SLIDES).toHaveLength(10);
  });

  it("shows 'О сериале' as page 9 and the finale as page 10", () => {
    expect(SLIDES[8]?.id).toBe("about");
    expect(SLIDES[9]?.id).toBe("finale");
  });

  it("uses photos from the series on pages 2, 8 and the 'О сериале' page", () => {
    const image = (i: number) => {
      const s = SLIDES[i];
      return s && "image" in s ? s.image : "";
    };
    expect(image(1)).toMatch(/osman-throne\.jpg$/);
    expect(image(7)).toMatch(/kayi-village\.jpg$/);
    expect(image(8)).toMatch(/osman-sword\.jpg$/);
  });
});
