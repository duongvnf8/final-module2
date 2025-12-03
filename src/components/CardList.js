import ContentSection from './ContentSection.js';
import Scroll from './Scroll.js';
import play from '../assets/icons/play.svg';

export default function CardList(
  title,
  items,
  baseRoute = '/playlists/details'
) {
  const renderCard = entry => `
    <a 
      href="${baseRoute}/${entry.slug || entry.id}"
      data-navigo
      class="cursor-pointer shrink-0 block group w-[320px] h-[274.6px]"
    >
      <div class="relative w-full h-[180px]">
        <img 
          src="${entry.thumbnails ?? entry.thumb}" 
          alt="${entry.title ?? entry.name}"
          class="rounded-xl w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 
                    group-hover:opacity-100 transition duration-200"></div>

        <div class="absolute inset-0 flex items-center justify-center opacity-0 
                    group-hover:opacity-100 transition duration-100">
            <img class="w-12 h-12" src="${play}" />
        </div>
      </div>

      <!-- Text area inside remaining space -->
      <div class="h-[94.6px] mt-2">
        <h3 class="text-white font-medium truncate">
          ${entry.title ?? entry.name}
        </h3>

        ${
          entry.albumType || entry.artists?.length
            ? `
          <p class="text-gray-400 text-sm truncate">
            ${entry.albumType || ''}
            ${entry.albumType && entry.artists?.length ? ' • ' : ''}
            ${
              entry.artists?.length
                ? entry.artists
                    .map(artist =>
                      typeof artist === 'string' ? artist : artist.name
                    )
                    .join(', ')
                : ''
            }
          </p>`
            : ''
        }
      </div>
    </a>
  `;

  const cardsHtml = (items || []).map(renderCard).join('');

  return ContentSection(title, Scroll(cardsHtml));
}
