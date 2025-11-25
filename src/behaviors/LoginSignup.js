async function LoginSignup() {
  const tabLogin = document.querySelector('#tab-login');
  const tabSignup = document.querySelector('#tab-signup');

  const formLogin = document.querySelector('#form-login');
  const formSignup = document.querySelector('#form-signup');

  console.log(tabLogin, tabSignup, formLogin, formSignup);

  tabLogin.addEventListener('click', () => {
    formLogin.classList.remove('hidden');
    formSignup.classList.add('hidden');
  });

  tabSignup.addEventListener('click', () => {
    formSignup.classList.remove('hidden');
    formLogin.classList.add('hidden');
  });
}

export { LoginSignup };
