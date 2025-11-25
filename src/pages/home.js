import categoriService from '../services/categoriService';
import todayHitService from '../services/todayHitService';

// fallback thumbnail (file bạn upload)

async function Home() {
  // nếu muốn thay đổi, sửa hai biến này
  const country = 'GLOBAL';
  const limit = 12;

  const categories = await categoriService.getAll();
  const btnCategories = categories
    .map(
      c => `
        <button
          class="px-4 py-2 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 text-white text-sm shrink-0"
        >
          ${c.name}
        </button>
      `
    )
    .join('');

  // Gọi service với query params
  const todayHit = await todayHitService.getAll({ country, limit });

  const videos = (todayHit || [])
    .map(v => {
      const thumb = v.thumbnails;
      const title = v.title;
      const views = v.popularity;

      return `
      <div class="w-[187px] bg-transparent shrink-0 cursor-pointer">

        <div class="relative rounded-xl overflow-hidden bg-[#0b0b0b] shadow-md">
          <img src="${thumb}" alt="${title}"
               class="w-full h-[187px] object-cover block rounded-xl" />
        </div>

        <div class="mt-3 px-1">
          <h3 class="text-white font-semibold text-base leading-tight line-clamp-2">
            ${title}
          </h3>

          <div class="text-sm text-gray-400 text-[14px] mt-2">
            ${views} lượt xem
          </div>
        </div>

      </div>
      `;
    })
    .join('');

  return `
    <div class="flex gap-3 overflow-x-auto whitespace-nowrap px-4 py-2">
      ${btnCategories}
    </div>

    <div>
      <div class="font-bold flex justify-between items-center">
        <h1 class="text-2xl">Nhạc mới mỗi ngày</h1>
        <div>
           <button id="playAllBtn" class="cursor-pointer hover:bg-white/20 font-medium px-3 py-1 rounded-full border border-gray-600">
             Phát tất cả
           </button>
        </div>
      </div>

      <div class="mt-4">
        <div id="explore-scroll" class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          ${videos}
        </div>
      </div>
    </div>
  `;
}

export default Home;
