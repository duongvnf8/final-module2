import ExploreService from '../services/ExploreService';
import CardList from '../components/CardList';
import CategoriesList from '../components/CategoriesList';

import newRelease from '../assets/icons/newRelease.svg';
import ranking from '../assets/icons/ranking.svg';
import mood from '../assets/icons/mood.svg';
import VideosList from '../components/VideosList';

async function ExplorePage() {
  const [albums, moodsGenres, videos] = await Promise.all([
    ExploreService.getAlbums(),
    ExploreService.getMoodsGenres(),
    ExploreService.getVideos(),
  ]);

  return `
    <div class="flex flex-col gap-7">
      <section class="flex gap-6 font-bold">
        <a
          href="/new-releases"
          class="cursor-pointer bg-[#292929] hover:bg-[#212121] rounded-md px-4 py-3 flex-1 flex justify-start items-center gap-3 text-[20px]" data-navigo>
          <img src="${newRelease}" alt="up icon" />
          <span>Bản phát hành mới</span>
        </a>

        <a
          href="/charts"
          class="cursor-pointer bg-[#292929] hover:bg-[#212121] rounded-md px-4 py-3 flex-1 flex justify-start items-center gap-3 text-[20px]" data-navigo>
          <img src="${ranking}" alt="ranking icon" />
          <span>Bảng xếp hạng</span>
        </a>

        <a 
          href="/moods-and-genres""
          class="cursor-pointer bg-[#292929] hover:bg-[#212121] rounded-md px-4 py-3 flex-1 flex justify-start items-center gap-3 text-[20px]" data-navigo>
          <img src="${mood}" alt="mood icon" />
          <span>Tâm trạng và thể loại</span>
        </a>

      </section>

      ${CardList('Khám phá Albums mới', albums, '/albums/details')}
      ${CategoriesList('Tâm trạng và thể loại', moodsGenres)}
      ${VideosList('Video nhạc mới', videos)}

    </div>
  `;
}

export default ExplorePage;
