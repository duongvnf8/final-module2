import App from './app.js';
import { initSidebarToggle } from './behaviors/initSidebarToggle.js';
import './main.css';
import initRouter from './route/router.js';

const render = async () => {
  document.querySelector('#app').innerHTML = await App();
};
await render();
await initRouter();
await initSidebarToggle();
