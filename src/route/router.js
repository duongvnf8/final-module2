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
import AlbumPlaylistPage from '../pages/AlbumPlaylistPage.js';

import HomeService from '../services/HomeService.js';
import ExploreService from '../services/ExploreService.js';
import DetailServices from '../services/DetailServices.js';
import {
  initAuthHandlers,
  initProfileHandlers,
} from '../controllers/AuthController.js';
import UpgradePage, { renderUpgradePage } from '../pages/UpgradePage.js';
import { ChartsController } from '../controllers/ChartsController.js';
import SongDetailPage from '../pages/SongDetailPage.js';
import LineSongsDetailPage from '../pages/LineSongsDetailPage.js';
import NewReleasePage from '../pages/NewReleasePage.js';
import { player } from '../controllers/PlayController.js';

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
    .on('/upgrade', () => {
      page.innerHTML = UpgradePage();
      renderUpgradePage();
    })
    .on('/charts', async () => {
      page.innerHTML = await ChartsPage();
      ChartsController();
    })
    .on('/videos/details/:id', async ({ data }) => {
      const videoDetails = await DetailServices.getVideoDetails(data.id);
      page.innerHTML = await SongDetailPage(videoDetails, data);
    })

    .on('/moods/:slug', async ({ data }) => {
      const moodDetails = await HomeService.getMoodDetails(data.slug);
      page.innerHTML = await MoodPage(moodDetails, data);
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

    .on('/categories/:slug', async ({ data }) => {
      const categories = await ExploreService.getCategoryBySlug(data.slug);
      page.innerHTML = await CategoryDetailPage(categories);
    })
    .on('/lines/:slug', async ({ data }) => {
      const [songs, playlists, videos, albums] = await Promise.all([
        ExploreService.getLineSongBySlug(data.slug),
        ExploreService.getLinePlaylistBySlug(data.slug),
        ExploreService.getLineVideoBySlug(data.slug),
        ExploreService.getLineAlbumBySlug(data.slug),
      ]);

      page.innerHTML = await LineSongsDetailPage(
        songs,
        playlists,
        videos,
        albums
      );
    })

    .on('/new-releases', async () => {
      const [releases, videos] = await Promise.all([
        ExploreService.getNewReleases(),
        ExploreService.getVideos(),
      ]);

      page.innerHTML = await NewReleasePage(releases, videos);
    })

    .on('/songs/details/:id', async ({ data }) => {
      const songDetails = await DetailServices.getSongDetails(data.id);
      page.innerHTML = await SongDetailPage(songDetails, data);
      await player.loadSong(songDetails);
      await player.playSong();
      player.showPlayer();
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
