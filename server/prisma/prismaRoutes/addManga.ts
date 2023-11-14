import { Anime, Prisma, PrismaClient, } from "@prisma/client";

const axios = require('axios');
import { AnimeListItem, AnimeListResponse } from "../../api/interface";

const prisma = new PrismaClient();

// Added Destructuring to clean code up


// No checks to see if title already exists in the DB, running risk of dupes

// Prisma transactions, so that if any promises fail none of the data is inserted


const formatAnime = ({title_english, synopsis, images, aired, trailer }: AnimeListItem) => {

  return {
    title: title_english,
    description: synopsis,
    coverImage: images.jpg.image_url,
    createdAt: aired.from,
    trailer: trailer.url,
  };
};


async function prismaCreateAnime(animeObject: AnimeListItem) {
  const {title, description, coverImage, createdAt, trailer} = formatAnime(animeObject)
  await prisma.anime.create({
    data: {
      title: title,
      description: description,
      coverImage: coverImage,
      createdAt: createdAt,
      trailer: trailer,
    },
  })
}

async function addAnime() {
try{
  const fetchAnime = process.env.FETCH_ANIME;
  const response = await axios.get(fetchAnime);

  const apiData = response.data.data; 



 await Promise.allSettled(apiData.map((object: AnimeListItem) => prismaCreateAnime(object)))

 await prisma.$disconnect();
} catch (error) {
console.log(`The Error is :`, error)
}
  }


addAnime();
