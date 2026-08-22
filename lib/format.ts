const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number) {
  return inrFormatter.format(value);
}

export function formatCrCurrency(value: number) {
  return `${formatCurrency(value)} Cr`;
}

export function formatPercent(value: number) {
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

export function formatCompactNumber(value: number) {
  return compactFormatter.format(value);
}
