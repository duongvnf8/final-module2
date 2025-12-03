// src/controllers/AuthController.js
import AuthService from '../services/AuthServices';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setAuthFromResponse(res) {
  const access =
    res?.access_token || res?.accessToken || res?.data?.access_token;
  const refresh =
    res?.refresh_token || res?.refreshToken || res?.data?.refresh_token;
  const user = res?.user || res?.data?.user || res?.data;

  try {
    if (access) localStorage.setItem('access_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    console.warn('setAuthFromResponse: localStorage error', err);
  }
}

function clearAuthAndRedirectLogin() {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  } catch (err) {
    console.warn('clearAuthAndRedirectLogin: localStorage error', err);
  }

  if (window.router && typeof window.router.navigate === 'function') {
    window.router.navigate('/login');
  } else {
    window.location.href = '/login';
  }
}

export function initAuthHandlers() {
  // prevent double-init
  const root = document.body;
  if (root.dataset.authInited === 'true') return;
  root.dataset.authInited = 'true';

  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');

  if (!formLogin && !formSignup) return;

  tabLogin?.addEventListener('click', () => {
    formLogin?.classList.remove('hidden');
    formSignup?.classList.add('hidden');
  });
  tabSignup?.addEventListener('click', () => {
    formSignup?.classList.remove('hidden');
    formLogin?.classList.add('hidden');
  });

  if (formLogin) {
    formLogin.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = formLogin.querySelector('button[type="submit"]');
      const email = (
        document.getElementById('login-email')?.value || ''
      ).trim();
      const password = (
        document.getElementById('login-password')?.value || ''
      ).trim();

      if (!email || !password) return alert('Vui lòng nhập email và mật khẩu');
      if (!isValidEmail(email)) return alert('Email không hợp lệ');

      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Đang đăng nhập...';
        }
        const res = await AuthService.login({ email, password });
        setAuthFromResponse(res);
        alert('Đăng nhập thành công');
        if (window.router && typeof window.router.navigate === 'function')
          window.router.navigate('/');
        else window.location.href = '/';
      } catch (err) {
        console.error('Login error:', err);
        const msg =
          err?.response?.data?.message || err.message || 'Đăng nhập thất bại';
        alert(msg);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Đăng nhập';
        }
      }
    });
  }

  if (formSignup) {
    formSignup.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = formSignup.querySelector('button[type="submit"]');
      const name = (document.getElementById('signup-name')?.value || '').trim();
      const email = (
        document.getElementById('signup-email')?.value || ''
      ).trim();
      const password = (
        document.getElementById('signup-password')?.value || ''
      ).trim();
      const confirm = (
        document.getElementById('signup-confirm')?.value || ''
      ).trim();

      if (!name || !email || !password)
        return alert('Vui lòng nhập đầy đủ thông tin');
      if (!isValidEmail(email)) return alert('Email không hợp lệ');
      if (password.length < 6) return alert('Mật khẩu phải có ít nhất 6 ký tự');
      if (password !== confirm) return alert('Mật khẩu xác nhận không khớp');
      if (!AuthService.signup)
        return alert('Chức năng đăng ký chưa có backend.');

      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Đang đăng ký...';
        }
        const res = await AuthService.signup({
          name,
          email,
          password,
          confirmPassword: confirm,
        });
        setAuthFromResponse(res);
        alert('Đăng ký thành công');
        if (window.router && typeof window.router.navigate === 'function')
          window.router.navigate('/');
        else window.location.href = '/';
      } catch (err) {
        console.error('Signup error:', err);
        const data = err?.response?.data;
        const msg = data?.message || err.message || 'Đăng ký thất bại';
        alert(msg);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Đăng ký';
        }
      }
    });
  }
}

export function initProfileHandlers() {
  // prevent double-init
  const root = document.body;
  if (root.dataset.profileInited === 'true') return;
  root.dataset.profileInited = 'true';

  const formUpdate = document.getElementById('form-update-profile');
  const formChange = document.getElementById('form-change-password');
  if (!formUpdate && !formChange) return;

  /* Update profile elements */
  const elName = document.getElementById('profile-name');
  const elEmail = document.getElementById('profile-email');
  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const btnUpdate = document.getElementById('btn-update-profile');
  const successUpdate = document.getElementById('update-success');

  const oldPwd = document.getElementById('old-password');
  const newPwd = document.getElementById('new-password');
  const confirmPwd = document.getElementById('confirm-password');
  const errOld = document.getElementById('err-old');
  const errNew = document.getElementById('err-new');
  const errConfirm = document.getElementById('err-confirm');
  const btnChange = document.getElementById('btn-change-password');
  const successChange = document.getElementById('change-success');

  const validateEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const clearUpdateErrors = () => {
    if (errName) {
      errName.classList.add('hidden');
      errName.textContent = '';
    }
    if (errEmail) {
      errEmail.classList.add('hidden');
      errEmail.textContent = '';
    }
    if (successUpdate) successUpdate.classList.add('hidden');
  };

  const clearChangeErrors = () => {
    if (errOld) {
      errOld.classList.add('hidden');
      errOld.textContent = '';
    }
    if (errNew) {
      errNew.classList.add('hidden');
      errNew.textContent = '';
    }
    if (errConfirm) {
      errConfirm.classList.add('hidden');
      errConfirm.textContent = '';
    }
    if (successChange) successChange.classList.add('hidden');
  };

  if (formUpdate) {
    formUpdate.addEventListener('submit', async e => {
      e.preventDefault();
      clearUpdateErrors();

      const name = (elName?.value || '').trim();
      const email = (elEmail?.value || '').trim();

      if (!name) {
        if (errName) {
          errName.textContent = 'Vui lòng nhập tên.';
          errName.classList.remove('hidden');
        }
        return;
      }
      if (!email || !validateEmail(email)) {
        if (errEmail) {
          errEmail.textContent = 'Email không hợp lệ.';
          errEmail.classList.remove('hidden');
        }
        return;
      }

      try {
        if (btnUpdate) {
          btnUpdate.disabled = true;
          btnUpdate.textContent = 'Đang lưu...';
        }

        await AuthService.updateProfile({ name, email });

        let freshUser = null;
        try {
          freshUser = await AuthService.getProfile();
        } catch (_) {}

        if (freshUser) {
          try {
            localStorage.setItem('user', JSON.stringify(freshUser));
          } catch (_) {}
          const dName = document.getElementById('profile-name-display');
          const dEmail = document.getElementById('profile-email-display');
          if (dName) dName.textContent = freshUser.name || name;
          if (dEmail) dEmail.textContent = freshUser.email || email;
          const idEl = document.getElementById('profile-id');
          if (idEl) idEl.textContent = freshUser.id || idEl.textContent;
        }

        if (successUpdate) {
          successUpdate.classList.remove('hidden');
          setTimeout(() => successUpdate.classList.add('hidden'), 3000);
        }
      } catch (err) {
        console.error('Update profile error', err);
        const data = err?.response?.data;
        const message = data?.message || err.message || 'Cập nhật thất bại';

        if (data?.errors) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach(it => {
              if (it.param === 'email' && errEmail) {
                errEmail.textContent = it.msg || it.message;
                errEmail.classList.remove('hidden');
              }
              if (it.param === 'name' && errName) {
                errName.textContent = it.msg || it.message;
                errName.classList.remove('hidden');
              }
            });
          } else if (typeof data.errors === 'object') {
            if (data.errors.email && errEmail) {
              errEmail.textContent = data.errors.email.join(', ');
              errEmail.classList.remove('hidden');
            }
            if (data.errors.name && errName) {
              errName.textContent = data.errors.name.join(', ');
              errName.classList.remove('hidden');
            }
          }
        } else {
          if (errEmail) {
            errEmail.textContent = message;
            errEmail.classList.remove('hidden');
          }
        }
      } finally {
        if (btnUpdate) {
          btnUpdate.disabled = false;
          btnUpdate.textContent = 'Lưu thay đổi';
        }
      }
    });
  }

  /* Change password */
  if (formChange) {
    formChange.addEventListener('submit', async e => {
      e.preventDefault();
      clearChangeErrors();

      const oldPassword = (oldPwd?.value || '').trim();
      const password = (newPwd?.value || '').trim();
      const confirm = (confirmPwd?.value || '').trim();

      if (!oldPassword) {
        if (errOld) {
          errOld.textContent = 'Nhập mật khẩu cũ.';
          errOld.classList.remove('hidden');
        }
        return;
      }
      if (password.length < 6) {
        if (errNew) {
          errNew.textContent = 'Mật khẩu mới tối thiểu 6 ký tự.';
          errNew.classList.remove('hidden');
        }
        return;
      }
      if (password !== confirm) {
        if (errConfirm) {
          errConfirm.textContent = 'Mật khẩu xác nhận không khớp.';
          errConfirm.classList.remove('hidden');
        }
        return;
      }

      try {
        if (btnChange) {
          btnChange.disabled = true;
          btnChange.textContent = 'Đang đổi...';
        }

        await AuthService.changePassword({
          oldPassword,
          password,
          confirmPassword: confirm,
        });

        if (successChange) {
          successChange.classList.remove('hidden');
          setTimeout(() => successChange.classList.add('hidden'), 3000);
        }

        clearAuthAndRedirectLogin();
      } catch (err) {
        console.error('Change password error', err);
        const data = err?.response?.data;
        const message = data?.message || err.message || 'Đổi mật khẩu thất bại';

        if (data?.errors) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach(it => {
              if (
                (it.param === 'oldPassword' || it.param === 'old_password') &&
                errOld
              ) {
                errOld.textContent = it.msg || it.message;
                errOld.classList.remove('hidden');
              }
              if (it.param === 'password' && errNew) {
                errNew.textContent = it.msg || it.message;
                errNew.classList.remove('hidden');
              }
            });
          } else if (typeof data.errors === 'object') {
            if (data.errors.oldPassword && errOld) {
              errOld.textContent = data.errors.oldPassword.join(', ');
              errOld.classList.remove('hidden');
            }
            if (data.errors.password && errNew) {
              errNew.textContent = data.errors.password.join(', ');
              errNew.classList.remove('hidden');
            }
          }
        } else {
          if (errNew) {
            errNew.textContent = message;
            errNew.classList.remove('hidden');
          }
        }
      } finally {
        if (btnChange) {
          btnChange.disabled = false;
          btnChange.textContent = 'Đổi mật khẩu';
        }
      }
    });
  }
}

export function initLogoutHandler() {
  const logoutBtn = document.getElementById('logout-btn');
  if (!logoutBtn) return;
  // prevent double binding
  if (logoutBtn.dataset.logoutInit === 'true') return;
  logoutBtn.dataset.logoutInit = 'true';

  logoutBtn.addEventListener('click', async e => {
    e.preventDefault();
    try {
      try {
        if (AuthService && typeof AuthService.logout === 'function') {
          await AuthService.logout();
        }
      } catch (_) {}
    } finally {
      clearAuthAndRedirectLogin();
    }
  });
}
