import './assets/main.css';
import App from './app.js';
import initRouter from './route/router.js';
import { initSidebarController } from './controllers/SidebarController.js';
import { initLogoutHandler } from './controllers/AuthController.js';
import { initHeaderController } from './controllers/HeaderController.js';
import { player } from './controllers/PlayController.js';

const render = async () => {
  document.querySelector('#app').innerHTML = await App();
};
await render();
initHeaderController();
initLogoutHandler();
initSidebarController();
await initRouter();
player.init();
