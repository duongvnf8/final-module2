import CardList from '../components/CardList';
import VideosList from '../components/VideosList';

async function NewReleasePage(releases, videos) {
  if (!releases.length && !videos.length)
    return "<p class='text-white p-4'>Không có dữ liệu</p>";

  return `
      <div class="p-4 text-white">
        ${CardList(
          '<h1 class="font-bold text-[24px] mb-4">Bản phát hành mới</h1>',
          releases,
          '/albums/details'
        )}
        ${VideosList('Video nhạc mới', videos)}
      </div>

    `;
}
export default NewReleasePage;
