import QuickPicksList from "../components/QuickPicksList";
import TagList from "../components/TagList";
import HomeService from "../services/HomeService";
import CardList from "../components/CardList";

async function HomePage() {
  const [moods, quickPick, albums, todaysHits, playLists] = await Promise.all([
    HomeService.getMoods(),
    HomeService.getQuickPicks(),
    HomeService.getAlbumsForYou(),
    HomeService.getTodaysHits(),
    HomeService.getPlaylistsByCountry("VN"),
  ]);
  return `
    <div class="p-2">
      ${TagList(moods)}
      ${QuickPicksList("Quick Picks", quickPick, "/playlists/details")}
      ${CardList("Album gợi ý cho bạn", albums, "/albums/details")}
      ${CardList("Today's Hits", todaysHits)}
      ${CardList("Nhạc Việt", playLists)}
    </div>
  `;
}
export default HomePage;
