import moreVert from '../assets/icons/moreVert.svg';
import cast from '../assets/icons/cast.svg';
import menu from '../assets/icons/menu.svg';
import search from '../assets/icons/search.svg';

function Header() {
  const accessToken = localStorage.getItem('access_token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  let authButton = `
    <a href="/login" class="bg-white border rounded-full text-black 
      px-3 py-1 font-medium text-[14px] cursor-pointer
      active:bg-black active:text-white ">
      Đăng nhập
    </a>
  `;

  if (accessToken && user) {
    const avatarHtml = user.avatar
      ? `<img id="user-avatar-img" src="${user.avatar}" alt="${user.name}" class="rounded-full h-10 w-10 object-cover" />`
      : `<div id="user-avatar-fallback" class="rounded-full h-10 w-10 flex items-center justify-center bg-white text-black font-bold">${(user.name ||
          'U')[0].toUpperCase()}</div>`;

    authButton = `
      <div id="user-wrap" class="relative">
        <button id="user-btn" aria-haspopup="true" aria-expanded="false"
          class=" cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10 focus:outline-none"
          title="${user.name}">
          ${avatarHtml}
          <span class="hidden sm:inline text-sm">${user.name}</span>
        </button>

        <div id="user-dropdown"
          class="hidden absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg py-1 w-48 border border-gray-200 z-50"
          role="menu">
          <a id="account-info" href="/profile" class="block px-4 py-2 hover:bg-gray-100" role="menuitem">Thông tin tài khoản</a>
          <button id="logout-btn" class="block w-full text-left px-4 py-2 hover:bg-gray-100" role="menuitem">Đăng xuất</button>
        </div>
      </div>
    `;
  }

  return `
    <header class="sticky top-0 flex justify-between items-center h-16 z-200 border-b border-b-white/20 backdrop-blur mr-[62px]">
      <div class="flex gap-3 items-center justify-between px-4 py-3 max-w-full">
        <button
          id="menu-btn"
          class="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <img src="${menu}" alt="menu" />
        </button>

        <a href="/" class="flex items-center gap-2 select-none">
          <img src="/logo.svg" alt="YouTube Music logo" class="h-6" />
        </a>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex bg-white/10 rounded-md px-3 py-2 w-120 ml-25">
            <img src="${search}" alt="search" />
            <input
              placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, podcast"
              class="bg-transparent outline-none text-sm text-white placeholder-white/50 ml-2 w-full"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 pr-4">
        <button class="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white" title="Kết nối với thiết bị">
          <img src="${cast}" alt="cast" />
        </button>

        <button class="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white" title="Cài đặt">
          <img src="${moreVert}" alt="more" />
        </button>

        ${authButton}
      </div>
    </header>
  `;
}

export default Header;
