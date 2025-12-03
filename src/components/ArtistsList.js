import { formatColumns } from '../format/formatColumns.js';
import { formatViews } from '../format/formatViews.js';
import ContentSection from './ContentSection.js';
import Scroll from './Scroll.js';

export default function ArtistsList(title, items = []) {
  function renderTrend(trend) {
    if (!trend) return '';
    if (trend === 'up')
      return `<span class="text-green-400 text-sm ml-1">▲</span>`;
    if (trend === 'down')
      return `<span class="text-red-400 text-sm ml-1">▼</span>`;
    return '';
  }

  function renderItem(artist) {
    const rankHtml = `<div class="flex gap-2 items-center text-2xl font-bold text-gray-300 w-10 text-center">
                        ${artist.rank}
                        ${renderTrend(artist.trend)}
                      </div>`;

    const infoHtml = `
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-1">
          <h3 class="text-white font-semibold truncate">${artist.name}</h3>
        </div>
        <p class="text-gray-400 text-xs">
          ${formatViews(artist.totalViews)} views
        </p>
      </div>
    `;

    return `
      <a
        href="/artist/${artist.artistId}"
        data-navigo
        class="flex items-center gap-8 py-3 hover:bg-white/5 rounded-lg transition cursor-pointer px-2"
      >
        ${rankHtml}
        ${infoHtml}
      </a>
    `;
  }

  function renderColumn(columnItems = []) {
    if (!columnItems.length) return '';
    const rows = columnItems.map(renderItem).join('');
    return `<div class="flex flex-col gap-3 shrink-0 min-w-[33%] -mb-6">${rows}</div>`;
  }

  const columns = formatColumns(items);
  const columnsHtml = columns.map(col => renderColumn(col)).join('');

  return ContentSection(title, Scroll(columnsHtml));
}
