import CardList from '../components/CardList';

export default function CategoryDetailPage(category = {}) {
  const title = category.name || 'Danh mục';

  const subs = Array.isArray(category.subcategories)
    ? category.subcategories
    : [];

  const contentHtml = subs
    .map(sub => {
      const subName = sub.name || 'Không rõ';
      const playlists = Array.isArray(sub.playlists) ? sub.playlists : [];
      return CardList(subName, playlists);
    })
    .join('');

  return `
    <div class="p-4 text-white">
      <h1 class="font-bold text-[45px] mb-10">${title}</h1>
      ${contentHtml}
    </div>
  `;
}
