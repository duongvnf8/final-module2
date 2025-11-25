async function Login() {
  return `
    <div class=" max-w-sm mx-auto mt-10">
      <table class="w-full text-center">
        <tr>
          <th id="tab-login" class="py-2 w-1/2">
            <button class="w-full cursor-pointer border rounded-2xl p-3 focus:text-black focus:bg-gray-200">
              Đăng nhập
            </button>
          </th>
          <th id="tab-signup" class="py-2 w-1/2">
            <button class="w-full cursor-pointer border rounded-2xl p-3 focus:text-black focus:bg-gray-200">
              Đăng ký
            </button>
          </th>
        </tr>
      </table>

      <form id="form-login" class="  flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="mb-1">Email</label>
          <input
            type="email"
            id="login-email"
            class="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:border-white"
            placeholder="Nhập email..."
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 ">Mật khẩu</label>
          <input
            type="password"
            id="login-password"
            class="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:border-white"
            placeholder="Nhập mật khẩu..."
          />
        </div>

        <button
          type="submit"
          class=" cursor-pointer mt-2 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-black hover:text-white hover:border-white border"
        >
          Đăng nhập
        </button>
      </form>

      <form id="form-signup" class="hidden flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="mb-1 ">Họ & tên</label>
          <input
            type="text"
            id="signup-name"
            class="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:border-white"
            placeholder="Nhập họ & tên..."
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 ">Email</label>
          <input
            type="email"
            id="signup-email"
            class="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:border-white"
            placeholder="Nhập email..."
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 ">Mật khẩu</label>
          <input
            type="password"
            id="signup-password"
            class="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:border-white"
            placeholder="Nhập mật khẩu..."
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 ">Nhập lại mật khẩu</label>
          <input
            type="password"
            id="signup-confirm"
            class="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:border-white"
            placeholder="Nhập lại mật khẩu..."
          />
        </div>

        <button
          type="submit"
          class="cursor-pointer mt-2 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-black hover:text-white hover:border-white border "
        >
          Đăng ký
        </button>
      </form>
    </div>
  `;
}

export default Login;
