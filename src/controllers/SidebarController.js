// src/controllers/SidebarController.js

let isInitialized = false;

export function initSidebarController() {
  // chống gắn sự kiện nhiều lần
  if (isInitialized) return;
  isInitialized = true;

  const btn = document.querySelector('#menu-btn');
  const sidebar = document.querySelector('.js-sidebar');
  const items = document.querySelectorAll('.js-sidebar ul li a');
  const texts = document.querySelectorAll('.js-text');
  const main = document.querySelector('#js-body');

  // auth elements
  const btnLogin = document.querySelector('.menu-item[href="/login"]');
  const hrElement = document.querySelector('.js-sidebar hr');
  const upgradeItem = document.querySelector('.menu-item[href="/upgrade"]');

  if (!btn || !sidebar || !main) {
    console.warn('SidebarController: elements not found');
    return;
  }

  /* -----------------------------------------
     1) Toggle Sidebar
  ------------------------------------------ */
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('w-[72px]');
    sidebar.classList.toggle('w-60');

    main.classList.toggle('ml-[322px]');
    main.classList.toggle('ml-[72px]');

    texts.forEach(t => {
      t.classList.toggle('text-[10px]');
      t.classList.toggle('text-base');
    });

    items.forEach(item => {
      item.classList.toggle('flex-col');
      item.classList.toggle('flex-row');
      item.classList.toggle('gap-3');
      item.classList.toggle('pl-5');
    });
  });

  /* -----------------------------------------
     2) Auth-based visibility
  ------------------------------------------ */
  const updateAuthVisibility = () => {
    const token = localStorage.getItem('access_token');

    const loginLi = btnLogin?.closest('li');
    const upgradeLi = upgradeItem?.closest('li');

    if (!btnLogin || !hrElement || !upgradeItem) return;

    if (token) {
      // authenticated → hide login & hr, show upgrade
      loginLi?.classList.add('hidden');
      hrElement.classList.add('hidden');
      upgradeLi?.classList.remove('hidden');
    } else {
      // not logged in → show login & hr, hide upgrade
      loginLi?.classList.remove('hidden');
      hrElement.classList.remove('hidden');
      upgradeLi?.classList.add('hidden');
    }
  };

  updateAuthVisibility();

  // nếu bạn muốn tự động cập nhật khi chuyển trang Navigo:
  if (window.router) {
    window.router.on('*', () => updateAuthVisibility());
  }
}
