import moreVert from '../assets/icons/moreVert.svg?raw';
function Header() {
  return `
    <header class="sticky top-0 flex justify-between items-center h-16 z-200 border-b border-b-white/20 backdrop-blur mr-[62px]">
      <div class="flex gap-3 items-center justify-between px-4 py-3 max-w-full">
        <button
          id="menu-btn"
          class=" cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <span class="material-symbols-outlined">menu</span>
        </button>

        <a href="/" class="flex items-center gap-2 select-none">
          <img src="/logo.svg" alt="YouTube Music logo" class="h-6" />
        </a>
        <div class="flex items-center gap-3">
          <div class="hidden sm:flex bg-white/10 rounded-md px-3 py-2 w-120 ml-25">
            <span class="material-symbols-outlined">search</span>
            <input
              placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, podcast"
              class="bg-transparent outline-none text-sm text-white placeholder-white/50 ml-2 w-full"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10" title="Kết nối với thiết bị">
          <span class="material-symbols-outlined">cast</span>
        </button>

        <button class="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10  text-white" title="Cài đặt">${moreVert}
        </button>
        <a href="/login" class="bg-white border rounded-full text-black 
         px-3 py-1 font-medium text-[14px] cursor-pointer
         active:bg-black active:text-white "
        >
          Đăng nhập
        </a>
      </div>
    </header>
  `;
}
export default Header;
