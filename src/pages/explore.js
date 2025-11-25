import up from '../assets/icons/up.png';
import categoriService from '../services/categoriService';
import videoService from '../services/videoService';

function chunkArray(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

async function Explore() {
  const categories = await categoriService.getAll();

  const groups = chunkArray(categories, 4);

  const columnsHtml = groups
    .map(group => {
      const buttons = group
        .map(c => {
          return `
            <button
              class=" text-[14px] relative flex items-center p-3 rounded-md text-white font-semibold text-left bg-[#2B2B2B] w-48"
            >
              <span class="absolute top-0 left-0 rounded-l-md w-1.5 h-full" style="background: ${c.color};"></span>
              <span class="ml-3">${c.name}</span>
            </button>
          `;
        })
        .join('');

      return `<div class="flex flex-col gap-3">${buttons}</div>`;
    })
    .join('');

  const videos = await videoService.getAll();
  const cardsHtml = videos
    .map(v => {
      const thumb = v.thumb;
      const views = v.views;
      const name = v.name;
      return `
    <div class="w-[320px] shrink-0">
      <div class="relative rounded-lg overflow-hidden bg-[#111]">
        <img src="${thumb}" class="w-full h-[180px] object-cover block rounded-lg" />
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.5)"/>
            <polygon points="26,20 46,32 26,44" fill="white"/>
          </svg>
        </div>
      </div>

      <div class="mt-3 px-1">
        <h3 class="text-white font-semibold text-[14px] leading-tight line-clamp-2">
          ${name}
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
  <div class="flex flex-col gap-7">

  <div class="flex justify-between gap-6 font-bold ">
    <a class=" cursor-pointer border border-gray-300 bg-[#212121] text-[20px] rounded-md px-4 py-3 text-2xl text-white">
      Bản phát hành mới
    </a>

    <a href="/charts" class="cursor-pointer border border-gray-300 bg-[#212121] text-[20px] rounded-md px-4 py-3 text-2xl text-white flex items-center">
      <img src="${up}" alt="up icon" class="w-6 h-6 inline-block mr-2 object-contain" />
      Bảng xếp hạng
    </a>

    <a class="cursor-pointer border border-gray-300 bg-[#212121] text-[20px] rounded-md px-4 py-3 text-2xl text-white flex items-center">
      <span class="material-symbols-outlined mr-2">sentiment_calm</span>
      Tâm trạng và thể loại
    </a>
  </div>

  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-white text-2xl font-bold">Đĩa đơn và nhạc mới</h2>
    </div>
    <div class="mt-4">
      <div class="flex gap-4 overflow-x-auto">
      </div>
    </div>
  </div>

  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-white text-2xl font-bold">Tâm trạng và thể loại</h2>

      <div class="flex items-center gap-2">
        <button class="cursor-pointer hover:bg-white/20 font-medium px-3 py-1 rounded-full border border-gray-600 text-white">
          Xem thêm
        </button>

        <button class="hover:bg-white/10 cursor-pointer h-9 w-9 rounded-full border border-gray-700 flex items-center justify-center">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>

        <button class="hover:bg-white/10 cursor-pointer h-9 w-9 rounded-full border border-gray-700 flex items-center justify-center">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    <div class="mt-4">
      <div class="flex gap-4 overflow-x-auto pb-2">
        ${columnsHtml}
      </div>
    </div>
  </div>

  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-white text-2xl font-bold">Video nhạc mới</h2>

      <div class="flex items-center gap-2">
        <button class="cursor-pointer hover:bg-white/20 font-medium px-3 py-1 rounded-full border border-gray-600 text-white">
          Xem thêm
        </button>

        <button class="hover:bg-white/10 cursor-pointer h-9 w-9 rounded-full border border-gray-700 flex items-center justify-center">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>

        <button class="hover:bg-white/10 cursor-pointer h-9 w-9 rounded-full border border-gray-700 flex items-center justify-center">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    <audio class="w-[450px]" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" controls></audio>

    <div class="mt-4">
      <div id="explore-scroll" class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          ${cardsHtml}
        </div>
    </div>
  </div>

</div>

  `;
}

export default Explore;
