import Navigo from 'navigo';

import HomePage from '../pages/HomePage.js';
import ExplorePage from '../pages/ExplorePage.js';
import LibraryPage from '../pages/LibraryPage.js';
import LoginPage from '../pages/LoginPage.js';
import ChartsPage from '../pages/ChartsPage.js';
import MoodsGenresPage from '../pages/MoodsGenresPage.js';
import MoodPage from '../pages/MoodPage.js';
import CategoryDetailPage from '../pages/CategoryDetailPage.js';
import ProfilePage from '../pages/ProfilePage.js';

import HomeService from '../services/HomeService.js';
import ExploreService from '../services/ExploreService.js';
import DetailServices from '../services/DetailServices.js';
import AlbumPlaylistPage from '../pages/AlbumPlaylistPage.js';
import {
  initAuthHandlers,
  initProfileHandlers,
} from '../controllers/AuthController.js';

const router = new Navigo('/', {
  hash: false,
  linksSelector: 'a',
});

const initRouter = async () => {
  const page = document.querySelector('#js-body');
  const loginPage = document.querySelector('#app');

  router
    .on('/', async () => {
      page.innerHTML = await HomePage();
    })

    .on('/explore', async () => {
      page.innerHTML = await ExplorePage();
    })

    .on('/library', () => {
      page.innerHTML = LibraryPage();
    })

    .on('/charts', async () => {
      page.innerHTML = await ChartsPage();
      if (typeof ChartsController === 'function') ChartsController();
    })

    .on('/moods-and-genres', async () => {
      page.innerHTML = await MoodsGenresPage();
    })
    .on('/playlists/details/:slug', async ({ data }) => {
      const playlistDetails = await DetailServices.getPlaylistDetails(
        data.slug
      );
      page.innerHTML = await AlbumPlaylistPage(playlistDetails);
    })
    .on('/albums/details/:slug', async ({ data }) => {
      const albumDetails = await DetailServices.getAlbumDetails(data.slug);
      page.innerHTML = await AlbumPlaylistPage(albumDetails);
    })

    .on('/moods/:slug', async ({ data }) => {
      const moodDetails = await HomeService.getMoodDetails(data.slug);
      page.innerHTML = await MoodPage(moodDetails, data);
    })

    .on('/categories/:slug', async ({ data }) => {
      const categories = await ExploreService.getCategoryBySlug(data.slug);
      page.innerHTML = await CategoryDetailPage(categories);
    })

    .on('/login', async () => {
      loginPage.innerHTML = await LoginPage();
      initAuthHandlers();
    })

    .on('/profile', async () => {
      page.innerHTML = await ProfilePage();
      initProfileHandlers();
    });

  router.resolve();
};

export default initRouter;
