import { PrismaClient, } from "@prisma/client";

const axios = require('axios');
import { AnimeListItem } from "../../api/interface";
import prisma from "../client";




const formatAnime = ({title_english, synopsis, images, aired, trailer }: AnimeListItem) => {

  return {
    title: title_english,
    description: synopsis,
    coverImage: images.jpg.image_url,
    createdAt: aired.from,
    trailer: trailer.url,
  };
};


async function findDupe(title: string) {
  const existingAnime = await prisma.anime.findFirst({
    where: {
      title: title
    }
  })
  return !!existingAnime;
}


async function prismaCreateAnime(animeObject: AnimeListItem) {
  const {title, description, coverImage, createdAt, trailer} = formatAnime(animeObject)
  if(await findDupe(title)) {
    console.log(`Anime title ${title} exists in the database`)
    return ;
  }
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
