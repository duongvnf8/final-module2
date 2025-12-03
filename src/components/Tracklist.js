import { formatTime } from '../format/formatTime';
import play from '../assets/icons/play.svg';

export default function TrackList(tracks = []) {
  const html = tracks
    .map((track, index) => {
      const thumbnail =
        track.thumbnails && track.thumbnails.length > 0
          ? track.thumbnails[0]
          : '';

      const artists = Array.isArray(track.artists)
        ? track.artists.join(', ')
        : '';

      return `
        <a 
          href="/songs/details/${track.id}"
          class="flex items-center gap-4 py-3 px-4 text-white hover:bg-white/10 cursor-pointer transition group"
        >
          <div class="w-6 text-right">${index + 1}</div>
          <div class="relative">
            <img 
              src="${thumbnail}" 
              class="w-12 h-12 rounded-lg object-cover"
            />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <img src="${play}" class="w-6 h-6" />
            </div>
          </div>

          <div class="flex flex-col flex-1">
            <div class="font-semibold truncate">${track.title}</div>
            <div class="text-sm text-white/60 truncate">${artists}</div>
          </div>
          <div class="text-sm text-white/50">${formatTime(track.duration)}</div>
        </a>
      `;
    })
    .join('');

  return `<div class="flex flex-col gap-2">${html}</div>`;
}
