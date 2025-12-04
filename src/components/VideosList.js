import ContentSection from './ContentSection.js';
import Scroll from './Scroll.js';
import play from '../assets/icons/play.svg';
import { formatViews } from '../format/formatViews.js';

export default function VideosList(title, items = []) {
  function VideoItem(item = {}) {
    const id = item.id;
    const name = item.name || item.title;
    const thumb = item.thumb;
    const views = formatViews(item.views);

    return `
      <a
        href="/videos/details/${id}"
        data-navigo
        class="w-[320px] h-[274.6px] cursor-pointer shrink-0 block group"
      >
        <div class="relative">
          <img
            src="${thumb}"
            class="rounded-xl w-full h-[180px] object-cover mb-2 transition duration-200"
          />

          <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200"></div>

          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-100">
            <img class="w-12 h-12" src="${play}" />
          </div>
        </div>

        <h3 class="h-[94.6px] text-white font-medium truncate my-2">${name}</h3>

        ${
          views !== null
            ? `<p class="text-gray-400 text-sm truncate">${views} lượt xem</p>`
            : ''
        }
      </a>
    `;
  }

  const html = (items || []).map(VideoItem).join('');
  return ContentSection(title, Scroll(html));
}
