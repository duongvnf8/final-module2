export function formatDuration(seconds) {
  // nếu không có seconds hoặc < 0 → trả 0:00
  if (!seconds || seconds < 0) return "0:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  // có giờ → hiển thị dạng H:MM:SS
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s}`;
  }

  // không có giờ → hiển thị dạng M:SS
  return `${m}:${s}`;
}
