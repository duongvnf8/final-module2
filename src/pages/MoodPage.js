import CardList from "../components/CardList";
import TagList from "../components/TagList";
import HomeService from "../services/HomeService";

async function MoodPage(moodData, routeParams) {
  const moodSlug = routeParams.slug;
  const moodHero = moodData.hero;
  const moodList = await HomeService.getMoods();

  return `
    <div class="p-4 text-white">

      <div class="mb-6">
        ${TagList(moodList, moodSlug)}
      </div>

      <h1 class="font-bold text-[45px] mb-4">${moodHero.title}</h1>
      <p>${moodHero.subtitle}</p>

      ${moodData.sections
        .map((section) => CardList(section.title, section.items))
        .join("")}

    </div>
  `;
}
export default MoodPage;
