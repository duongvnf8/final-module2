import upgrade from '../assets/icons/upgrade.svg';
import home from '../assets/icons/home.svg';
import explore from '../assets/icons/explore.svg';
import library from '../assets/icons/library.svg';
import login from '../assets/icons/login.svg';

function Sidebar() {
  return `
    <div class="js-sidebar h-screen w-[72px] z-150 border-r border-r-white/20 fixed top-16 left-0">
      <ul class="space-y-1 p-1">
  <li>
    <a
      href="/"
      data-navigo
      class="menu-item flex flex-col items-center py-3 rounded-lg hover:bg-[#333] gap-1"
    >
      <img src="${home}"/>
      <span class="js-text text-[10px]">Trang chủ</span>
    </a>
  </li>

  <li>
    <a
      href="/explore"
      data-navigo
      class="menu-item flex flex-col items-center py-3 rounded-lg hover:bg-[#333] gap-1"
    >
      <img src="${explore}"/>
      <span class="js-text text-[10px]">Khám phá</span>
    </a>
  </li>

  <li>
    <a
      href="/library"
      data-navigo
      class="menu-item flex flex-col items-center py-3 rounded-lg hover:bg-[#333] gap-1"
    >
      <img src="${library}"/>
      <span class="js-text text-[10px]">Thư viện</span>
    </a>
  </li>

  <li>
    <a
      href="/upgrade"
      data-navigo
      class="menu-item flex flex-col items-center py-3 rounded-lg hover:bg-[#333] gap-1"
    >
      <img src="${upgrade}"/>
      <span class="js-text text-[10px]">Nâng cấp</span>
    </a>
  </li>

  <li>
    <hr class="border-gray-300" />
  </li>

  <li>
    <a
      href="/login"
      data-navigo
      class="menu-item flex flex-col items-center py-3 rounded-lg hover:bg-[#333] gap-1"
    >
      <img src="${login}"/>
      <span class="js-text text-[10px]">Đăng nhập</span>
    </a>
  </li>
</ul>

    </div>
  `;
}

export default Sidebar;
