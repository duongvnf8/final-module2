export default function MediaInfo(data = {}) {
  const isAlbum = Boolean(data.albumType);
  const isPlaylist = !isAlbum;

  const cover = (data.thumbnails && data.thumbnails[0]) || '';
  const title = data.title || data.name || 'Không rõ';
  const description = data.description || '';

  const songCount =
    typeof data.songCount === 'number' && data.songCount > 0
      ? data.songCount
      : null;

  const duration =
    typeof data.duration === 'number' && data.duration > 0
      ? data.duration
      : null;

  const hours = duration ? Math.floor(duration / 3600) : 0;
  const minutes = duration ? Math.floor((duration % 3600) / 60) : 0;

  const albumType = data.albumType || null;
  const releaseDate = data.releaseDate
    ? new Date(data.releaseDate).toLocaleDateString('vi-VN')
    : null;

  const artists =
    Array.isArray(data.artists) && data.artists.length > 0
      ? data.artists.join(', ')
      : null;

  return `
    <div class="sticky top-24 text-white flex flex-col gap-5 items-center">
      <img src="${cover}" alt="${title}" class="rounded-xl w-[245px] h-[245px] object-cover" />

      <h1 class="text-[28px] font-bold text-center">${title}</h1>

      ${
        isPlaylist && description
          ? `<p class="text-white/70 text-[16px] text-center">${description}</p>`
          : ''
      }

      <div class="text-[16px] text-white/80 text-center flex flex-col gap-2">
        ${
          songCount || duration
            ? `
          <div class="flex items-center justify-center">
            ${songCount ? `<span>${songCount} bài hát</span>` : ''}
            ${songCount && duration ? `<span class="mx-2">•</span>` : ''}
            ${duration ? `<span>${hours} giờ ${minutes} phút</span>` : ''}
          </div>
        `
            : ''
        }

        ${isPlaylist && artists ? `<p>Các nghệ sĩ: ${artists}</p>` : ''}

        ${
          isAlbum && (albumType || releaseDate)
            ? `
          ${albumType ? `<p>Loại album: ${albumType}</p>` : ''}
          ${releaseDate ? `<p>Phát hành: ${releaseDate}</p>` : ''}
        `
            : ''
        }
      </div>
    </div>
  `;
}
