import QuickPicksList from '../components/QuickPicksList';
import TagList from '../components/TagList';
import CardList from '../components/CardList';
import HomeService from '../services/HomeService';

async function HomePage() {
  const [moods, quickPicks, albumsForYou, todaysHits, playlistsVN] =
    await Promise.all([
      HomeService.getMoods(),
      HomeService.getQuickPicks(),
      HomeService.getAlbumsForYou(),
      HomeService.getTodaysHits(),
      HomeService.getPlaylistsByCountry('VN'),
    ]);

  return `
    <div class="p-2">
      ${TagList(moods)}
      ${QuickPicksList('Quick Picks', quickPicks, '/playlists/details')}
      ${CardList('Album gợi ý cho bạn', albumsForYou, '/albums/details')}
      ${CardList("Today's Hits", todaysHits)}
      ${CardList('Nhạc Việt', playlistsVN)}
    </div>
  `;
}

export default HomePage;
