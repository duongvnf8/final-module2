import Scroll from './Scroll';

export default function TagList(tags = [], currentSlug = '') {
  const renderTag = tag => `
    <a 
      href="/moods/${tag.slug}"
      data-navigo
      class="
        flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer
        ${
          tag.slug === currentSlug
            ? 'bg-white text-black font-semibold'
            : 'bg-white/10 text-white hover:bg-white/20'
        }
      "
    >
      ${tag.name}
    </a>
  `;

  const html = tags.map(renderTag).join('');
  return Scroll(html);
}
