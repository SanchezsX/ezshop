export function abbreviateNumber(num: number): string {
  if (num < 1000) return num.toString();

  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(num) / 3);

  const shortNum = num / Math.pow(1000, tier);
  return `${shortNum.toFixed(shortNum % 1 === 0 ? 0 : 1)}${suffixes[tier]}`;
}
