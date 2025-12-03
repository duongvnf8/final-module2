export function formatTime(seconds = 0) {
  if (typeof seconds !== 'number' || seconds < 0) {
    return '0:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs}`;
  }

  return `${minutes}:${secs}`;
}
