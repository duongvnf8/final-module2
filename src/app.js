import Player from './components/Player.js';
import Header from './components/header.js';
import Sidebar from './components/Sidebar.js';

async function App() {
  return `
    ${Sidebar()}
    <div>
    ${Header()}
    <main id="js-body" class=" mt-8 mb-[90px] ml-[170px] mr-[62px] "></main>
    </div>
    ${Player()}
  `;
}
export default App;
