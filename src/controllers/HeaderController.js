import AuthService from '../services/AuthServices';

export function initHeaderController() {
  const userBtn = document.getElementById('user-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const userWrap = document.getElementById('user-wrap');

  if (!userBtn || !userDropdown || !userWrap) return;

  const toggle = open => {
    if (open === undefined) userDropdown.classList.toggle('hidden');
    else if (open) userDropdown.classList.remove('hidden');
    else userDropdown.classList.add('hidden');

    userBtn.setAttribute(
      'aria-expanded',
      String(!userDropdown.classList.contains('hidden'))
    );
  };

  userBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggle();
  });

  document.addEventListener('click', e => {
    if (!userWrap.contains(e.target)) toggle(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async e => {
      e.preventDefault();
      try {
        try {
          if (AuthService && typeof AuthService.logout === 'function') {
            await AuthService.logout();
          }
        } catch (err) {}

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        if (window.router && typeof window.router.navigate === 'function') {
          window.router.navigate('/login');
        } else {
          window.location.href = '/login';
        }
      } catch (err) {
        console.error('Logout error', err);
      }
    });
  }

  const avatarImg = document.getElementById('user-avatar-img');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const initial = (user?.name || 'U')[0].toUpperCase();

        const fallback =
          document.getElementById('user-avatar-fallback') ||
          document.createElement('div');

        fallback.id = 'user-avatar-fallback';
        fallback.className =
          'rounded-full h-10 w-10 flex items-center justify-center bg-white text-black font-bold';
        fallback.textContent = initial;

        avatarImg.replaceWith(fallback);
      } catch (err) {
        console.error('Avatar fallback error', err);
      }
    });
  }
}
