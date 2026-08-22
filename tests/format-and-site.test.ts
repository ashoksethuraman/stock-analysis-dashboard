import { describe, expect, it } from "vitest";

import {
  formatCompactNumber,
  formatCrCurrency,
  formatCurrency,
  formatPercent,
} from "@/lib/format";
import { siteConfig } from "@/lib/site";

describe("format and site utilities", () => {
  it("formats currency and percentages for the UI", () => {
    expect(formatCurrency(3450)).toBe("₹3,450");
    expect(formatCrCurrency(520000)).toBe("₹5,20,000 Cr");
    expect(formatPercent(15)).toBe("15%");
    expect(formatPercent(15.4)).toBe("15.4%");
    expect(formatCompactNumber(520000)).toBeTruthy();
  });

  it("exposes stable site metadata configuration", () => {
    expect(siteConfig.name).toBe("Stock Analysis Dashboard");
    expect(siteConfig.url).toContain("stock-analysis-dashboard");
    expect(siteConfig.keywords.length).toBeGreaterThan(0);
  });
});
