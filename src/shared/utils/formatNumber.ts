export function formatNumber(value: number, fractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
