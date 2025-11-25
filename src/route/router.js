import Navigo from 'navigo';
import Explore from '../pages/explore.js';
import Library from '../pages/library.js';
import Home from '../pages/home.js';
import Chart from '../pages/chart.js';
import Login from '../pages/login.js';

import { LoginSignup } from '../behaviors/LoginSignup.js';

const router = new Navigo('/', {
  hash: false,
  linksSelector: 'a',
});

const initRouter = async () => {
  const page = document.querySelector('#js-body');
  const loginPage = document.querySelector('#app');
  router
    .on('/', async () => {
      page.innerHTML = await Home();
    })

    .on('/explore', async () => {
      page.innerHTML = await Explore();
    })

    .on('/library', () => {
      page.innerHTML = Library();
    })

    .on('/charts', async () => {
      page.innerHTML = await Chart();
    })

    .on('/login', async () => {
      loginPage.innerHTML = await Login();

      await LoginSignup();
    });

  router.resolve();
};

export default initRouter;
