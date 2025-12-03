export function formatViews(views = 0) {
  if (typeof views !== 'number' || views < 0) {
    return '0';
  }

  if (views >= 1_000_000_000) {
    return `${Math.floor(views / 1_000_000_000)} T`;
  }

  if (views >= 1_000_000) {
    return `${Math.floor(views / 1_000_000)} Tr`;
  }

  if (views >= 1_000) {
    return `${Math.floor(views / 1_000)} N`;
  }

  return String(views);
}
