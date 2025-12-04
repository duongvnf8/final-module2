import Scroll from './Scroll.js';
import ContentSection from './ContentSection.js';
import { formatColumns } from '../format/formatColumns.js';

export default function CategoriesList(
  title = '',
  categories = [],
  basePath = '/categories'
) {
  function CategoryItem(item = {}) {
    const slug = item.slug;
    const name = item.name;
    const color = item.color;

    const href = `${basePath}/${slug}`;

    return `
      <a
        href="${href}"
        data-navigo
        class="h-12 rounded-lg flex items-center text-white text-sm font-semibold cursor-pointer bg-[#292929] overflow-hidden"
      >
        <div
          style="background-color: ${color};"
          class="h-full w-2 rounded-l-[999px] rounded-tr-[30px] rounded-br-[30px]"
        ></div>

        <div class="w-full flex-1 flex items-center justify-center px-2 truncate">
          ${name}
        </div>
      </a>
    `;
  }

  function CategoryColumn(items = []) {
    return `
      <div class="flex flex-col shrink-0 w-40 md:w-48 lg:w-52 xl:w-60 gap-4">
        ${items.map(CategoryItem).join('')}
      </div>
    `;
  }

  const columns = formatColumns(categories || []);
  const html = columns.map(CategoryColumn).join('');

  return ContentSection(title, Scroll(html));
}
