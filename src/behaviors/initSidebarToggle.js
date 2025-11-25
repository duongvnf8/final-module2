async function initSidebarToggle() {
  const btn = document.querySelector('#menu-btn');
  const items = document.querySelectorAll('.js-sidebar ul li a');
  const sidebar = document.querySelector('.js-sidebar');
  const texts = document.querySelectorAll('.js-text');
  const main = document.querySelector('#js-body');
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
}
export { initSidebarToggle };
