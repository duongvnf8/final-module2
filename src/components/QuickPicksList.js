import { formatViews } from "../format/formatViews";
import { splitToColumns } from "../format/splitToColumns";
import ContentSection from "./ContentSection";
import Scroll from "./Scroll";
import play from "../assets/icons/play.svg";

export default function QuickPicksList(
  title,
  items = [],
  basePath = "/songs/details"
) {
  function ListItem(item) {
    const image =
      Array.isArray(item.thumbnails) && item.thumbnails.length > 0
        ? item.thumbnails[0]
        : item.thumb;

    const hasArtists = Array.isArray(item.artists) && item.artists.length > 0;

    const subtitle = hasArtists
      ? item.artists[0]
      : `
    <span>${formatViews(item.views) ?? 0} lượt xem</span>
    <span class="ml-2">•</span>
    <span>${item.albumName ?? ""}</span>
  `;

    return `
        <a
          href="${basePath}/${item.id ?? item.slug}"
          data-navigo
          class="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg transition cursor-pointer group"
        >
          <div class="relative overflow-hidden rounded">
            <img 
              src="${image}" 
              class="w-12 h-12 rounded object-cover transition duration-200 group-hover:brightness-50"
            />

            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200"></div>

            <!-- Play icon -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
              <img src="${play}">
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <h3 class="text-white font-medium truncate">${
              item.title || item.name
            }</h3>
            <p class="text-gray-400 truncate">${subtitle}</p>
          </div>
        </a>
    `;
  }

  function ListColumn(items) {
    return `
      <div class="flex flex-col gap-3 shrink-0 min-w-[30%] pb-6 items-start">
        ${items.map(ListItem).join("")}
      </div>
    `;
  }

  const columns = splitToColumns(items);
  const colHtml = columns.map(ListColumn).join("");

  return ContentSection(title, Scroll(colHtml));
}
