const axios = require('axios');
import { AnimeListItem } from "../middleware/interface";

// async function findDupe(title: string) {
//   const existingAnime = await prisma.anime.findFirst({
//     where: {
//       title: title
//     }
//   })
//   return !!existingAnime;
// }

const formatAnime = ({title_english, synopsis, images, aired, trailer }: AnimeListItem) => {

  return {
    title: title_english,
    description: synopsis,
    coverImage: images.jpg.image_url,
    createdAt: aired.from,
    trailer: trailer.url,
  };
};

export async function fetchAnime(api: string | undefined ) {
try{
  const response = await axios.get(api);
  const apiData = response.data.data; 

 const results = await Promise.allSettled(apiData.map((object: AnimeListItem) => formatAnime(object)))

return results;
} catch (error) {
console.log(`The Error is :`, error)
}
  }

