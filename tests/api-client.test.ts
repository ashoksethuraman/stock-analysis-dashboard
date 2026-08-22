import { beforeEach, describe, expect, it, vi } from "vitest";

const headersMock = vi.fn();
const fetchMock = vi.fn();

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

describe("internal API clients", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete process.env.INTERNAL_API_BASE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("prefers INTERNAL_API_BASE_URL when present", async () => {
    process.env.INTERNAL_API_BASE_URL = "https://internal.example.com";

    const { getBaseUrl } = await import("@/lib/api/base-url");

    await expect(getBaseUrl()).resolves.toBe("https://internal.example.com");
  });

  it("falls back to NEXT_PUBLIC_SITE_URL when provided", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://public.example.com";

    const { getBaseUrl } = await import("@/lib/api/base-url");

    await expect(getBaseUrl()).resolves.toBe("https://public.example.com");
  });

  it("derives the base URL from forwarded headers when env vars are absent", async () => {
    headersMock.mockResolvedValue({
      get(name: string) {
        if (name === "x-forwarded-host") return "dashboard.example.com";
        if (name === "x-forwarded-proto") return "https";
        return null;
      },
    });

    const { getBaseUrl } = await import("@/lib/api/base-url");

    await expect(getBaseUrl()).resolves.toBe("https://dashboard.example.com");
  });

  it("fetches the stock collection through the internal API", async () => {
    process.env.INTERNAL_API_BASE_URL = "https://internal.example.com";
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [{ symbol: "TECH" }],
    });

    vi.stubGlobal("fetch", fetchMock);

    const { fetchStocks } = await import("@/lib/api/stocks");

    await expect(fetchStocks()).resolves.toEqual([{ symbol: "TECH" }]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://internal.example.com/api/stocks",
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );
  });

  it("throws when the stock detail API call fails", async () => {
    process.env.INTERNAL_API_BASE_URL = "https://internal.example.com";
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => null,
    });

    vi.stubGlobal("fetch", fetchMock);

    const { fetchStock } = await import("@/lib/api/stocks");

    await expect(fetchStock("TECH")).rejects.toThrow(
      "API request failed for /api/stocks/TECH"
    );
  });
});
