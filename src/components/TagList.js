import Scroll from './Scroll';

export default function TagList(tagData, currentSlug = '') {
  const renderTag = item => `
    <a 
      href="/moods/${item.slug}" 
      data-navigo
      class="flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer
        ${
          item.slug === currentSlug
            ? 'bg-white text-black font-semibold'
            : 'bg-white/10 text-white hover:bg-white/20'
        }
      "
    >
      ${item.name}
    </a>
  `;

  const tagHtml = (tagData || []).map(renderTag).join('');

  return Scroll(tagHtml);
}
