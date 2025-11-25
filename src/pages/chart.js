import chartVideoService from '../services/chartVideoService';
import chartArtistService from '../services/chartArtistService';

async function Chart() {
  const chartsVideo = await chartVideoService.getAll();

  const videoIteam = chartsVideo
    .map(v => {
      const thumb = v.thumb;
      const title = v.title;
      const views = v.views;

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

  const chartArtists = await chartArtistService.getAll();

  const artistsItem = chartArtists
    .map(a => {
      const avatar = '';
      const name = a.name;
      const views = a.totalViews;
      const rank = a.rank;
      const delta = a.delta;
      const trend = a.trend;

      return `
      <div class="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg">

        <div class="text-gray-300 w-5">${rank}</div>

        <img src="${avatar}" class="w-10 h-10 rounded-full object-cover" />

        <div class="flex-1">
          <div class="text-white font-semibold">${name}</div>
          <div class="text-gray-400 text-sm">${views.toLocaleString(
            'vi-VN'
          )} người đăng ký</div>
        </div>

        <div class="ml-auto text-sm font-semibold">
          ${
            trend === 'up'
              ? `<span class="text-green-400">▲${delta}</span>`
              : trend === 'down'
              ? `<span class="text-red-400">▼${Math.abs(delta)}</span>`
              : `<span class="text-gray-400">—</span>`
          }
        </div>

      </div>
      `;
    })
    .join('');

  return `
  <div>

    <div><h1 class="text-[34px]">Bảng xếp hạng</h1></div>

    <div>
      <h2 class="text-white text-2xl font-bold mb-3">Bảng xếp hạng video</h2>
    </div>

    <div class="mt-4">
      <div id="explore-scroll" class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        ${videoIteam}
      </div>
    </div>

    <!-- Artists -->
    <div class="mt-10">
      <h2 class="text-white text-2xl font-bold mb-3">Nghệ sĩ hàng đầu</h2></h2>

      <div class="grid grid-cols-2 gap-5">
        ${artistsItem}
      </div>
    </div>

  </div>
  `;
}

export default Chart;
