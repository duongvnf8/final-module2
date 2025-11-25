import Footer from './components/footer.js';
import Header from './components/header.js';
import Sidebar from './components/sidebar.js';

async function App() {
  return `
    ${Sidebar()}
    <div>
    ${Header()}
    <main id="js-body" class=" my-8 ml-[170px] mr-[62px] "></main>
    </div>
    ${Footer()}
  `;
}
export default App;
