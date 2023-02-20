export function wilson_score(up: number, down: number) {
  if (!up) return -down;
  const n = up + down;
  const z = 1.64485;
  const phat = up / n;
  return (
    (phat + (z * z) / (2 * n) - z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * n)) / n)) /
    (1 + (z * z) / n)
  );
}
