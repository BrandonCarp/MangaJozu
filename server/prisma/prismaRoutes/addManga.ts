import { Anime, Prisma, PrismaClient, } from "@prisma/client";

const axios = require('axios');
import { AnimeListItem, AnimeListResponse } from "../../api/interface";

const prisma = new PrismaClient();




const formatAnime = (data: AnimeListItem) => {

  return {
    title: data.title_english,
    description: data.synopsis,
    coverImage: data.images.jpg.image_url,
    createdAt: data.aired.from,
    trailer: data.trailer.url,
  };
};


async function prismaCreateAnime(animeObject: AnimeListItem) {
  const formattedData = formatAnime(animeObject)
  await prisma.anime.create({
    data: {
      title: formattedData.title,
      description: formattedData.description,
      coverImage: formattedData.coverImage,
      createdAt: formattedData.createdAt,
      trailer: formattedData.trailer,
    },
  })
}

async function addAnime() {
try{
  const fetchAnime = process.env.FETCH_ANIME;
  const response = await axios.get(fetchAnime);

  const apiData = response.data.data; 
console.log(apiData)
 await Promise.all(apiData.map((object: AnimeListItem) => prismaCreateAnime(object)))
 await prisma.$disconnect();
} catch (error) {
console.log(`The Error is :`, error)
}
  }


addAnime();
