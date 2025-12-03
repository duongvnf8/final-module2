function formatDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    return dt.toLocaleString();
  } catch {
    return d;
  }
}

export default async function ProfilePage() {
  const stored = JSON.parse(localStorage.getItem('user') || 'null');
  const user = stored || {
    id: '',
    name: '',
    email: '',
    created_at: '',
    updated: '',
  };

  return `
    <div class="p-6 max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Thông tin tài khoản</h1>

      <div class="flex items-center gap-4 mb-6">
        ${
          user.avatar
            ? `<img id="profile-avatar" src="${user.avatar}" alt="${user.name}" class="rounded-full h-20 w-20 object-cover" />`
            : `<div id="profile-avatar-fallback" class="rounded-full h-20 w-20 bg-white text-black flex items-center justify-center text-3xl font-bold">
                 ${(user.name || 'U')[0].toUpperCase()}
               </div>`
        }
        <div>
          <p class="text-lg font-semibold" id="profile-name-display">${
            user.name || ''
          }</p>
          <p class="text-gray-400 text-sm" id="profile-email-display">${
            user.email || ''
          }</p>
        </div>
      </div>

      <section class="mb-8 bg-[#0b0b0b] p-4 rounded-lg border border-white/10">
        <h2 class="text-lg font-semibold mb-3">Cập nhật thông tin</h2>
        <form id="form-update-profile" class="space-y-3">
          <div>
            <label class="block text-sm mb-1">Họ & tên</label>
            <input id="profile-name" type="text" value="${user.name || ''}"
              class="w-full px-3 py-2 rounded bg-[#111] border border-gray-700 focus:outline-none" />
            <p id="err-name" class="text-red-400 text-sm mt-1 hidden"></p>
          </div>

          <div>
            <label class="block text-sm mb-1">Email</label>
            <input id="profile-email" type="email" value="${user.email || ''}"
              class="w-full px-3 py-2 rounded bg-[#111] border border-gray-700 focus:outline-none" />
            <p id="err-email" class="text-red-400 text-sm mt-1 hidden"></p>
          </div>

          <div>
            <button id="btn-update-profile" type="submit"
              class="bg-white text-black px-4 py-2 rounded">Lưu thay đổi</button>
            <span id="update-success" class="ml-3 text-green-400 hidden">Cập nhật thành công</span>
          </div>
        </form>
      </section>

      <section class="mb-8 bg-[#0b0b0b] p-4 rounded-lg border border-white/10">
        <h2 class="text-lg font-semibold mb-3">Đổi mật khẩu</h2>
        <form id="form-change-password" class="space-y-3">
          <div>
            <label class="block text-sm mb-1">Mật khẩu cũ</label>
            <input id="old-password" type="password"
              class="w-full px-3 py-2 rounded bg-[#111] border border-gray-700 focus:outline-none" />
            <p id="err-old" class="text-red-400 text-sm mt-1 hidden"></p>
          </div>

          <div>
            <label class="block text-sm mb-1">Mật khẩu mới</label>
            <input id="new-password" type="password"
              class="w-full px-3 py-2 rounded bg-[#111] border border-gray-700 focus:outline-none" />
            <p id="err-new" class="text-red-400 text-sm mt-1 hidden"></p>
          </div>

          <div>
            <label class="block text-sm mb-1">Xác nhận mật khẩu mới</label>
            <input id="confirm-password" type="password"
              class="w-full px-3 py-2 rounded bg-[#111] border border-gray-700 focus:outline-none" />
            <p id="err-confirm" class="text-red-400 text-sm mt-1 hidden"></p>
          </div>

          <div>
            <button id="btn-change-password" type="submit"
              class="bg-white text-black px-4 py-2 rounded">Đổi mật khẩu</button>
            <span id="change-success" class="ml-3 text-green-400 hidden">Đổi mật khẩu thành công</span>
          </div>
        </form>
      </section>

      <div class="text-sm text-gray-400">
        <p><strong>ID:</strong> <span id="profile-id">${user.id}</span></p>
        <p><strong>Tạo lúc:</strong> <span id="profile-created">${formatDate(
          user.created_at
        )}</span></p>
        <p><strong>Cập nhật:</strong> <span id="profile-updated">${formatDate(
          user.updated
        )}</span></p>
      </div>

      <a href="/" class="inline-block mt-6 text-blue-500 hover:underline">← Quay lại trang chủ</a>
    </div>
  `;
}
