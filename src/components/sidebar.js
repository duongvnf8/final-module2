function Sidebar() {
  return `
    <div class="js-sidebar h-screen w-[72px] z-150 border-r border-r-white/20 fixed top-16 left-0">
      
      <ul class="space-y-1 p-1" aria-hidden="false">
        <li>
          <a
            href="/"
            class="menu-item flex flex-col items-center py-3 rounded-lg focus:bg-[#333]"
          >
            <span class="material-symbols-outlined">home</span>
            <span class="js-text text-[10px]">Trang chủ</span>
          </a>
        </li>

        <li>
          <a
            href="/explore"
            class="menu-item flex flex-col items-center py-3 rounded-lg focus:bg-[#333]"
          >
            <span class="material-symbols-outlined">explore</span>
            <span class="js-text text-[10px]">Khám phá</span>
          </a>
        </li>

        <li>
          <a
            href="/library"
            class="menu-item flex flex-col items-center py-3 rounded-lg focus:bg-[#333]"
          >
            <span class="material-symbols-outlined">bookmark</span>
            <span class="js-text text-[10px]">Thư viện</span>
          </a>
        </li>

        <!--<li>
          <a
            href="#"
            class="menu-item flex flex-col items-center py-3 rounded-lg focus:bg-[#333]"
          >
            <span class="material-symbols-outlined">youtube_activity</span>
            <span class="js-text text-[10px]">Nâng cấp</span>
          </a>
        </li>-->

        <hr class="my-2 opacity-20" />

        <li>
          <a
            href="/login"
            class="menu-item flex flex-col items-center py-3 rounded-lg hover:bg-[#333]"
          >
            <span class="material-symbols-outlined">switch_account</span>
            <span class="js-text text-[10px]">Đăng nhập</span>
          </a>
        </li>
      </ul>
    </div>
  `;
}

export default Sidebar;
