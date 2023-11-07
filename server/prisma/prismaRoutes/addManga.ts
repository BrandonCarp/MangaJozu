import { Prisma, PrismaClient, } from "@prisma/client";

const axios = require('axios');
// import { MangaItem } from "../../api/interface";

const prisma = new PrismaClient();


export interface AnimeListItem {
  title_english: string;
 synopsis: string;
 images: {
   jpg: {
    image_url: string;
   }
 }
 aired: {
  from: string;
 }
 trailer: {
  url: string;
 }
}

export interface AnimeListResponse {
  items: AnimeListItem[];
}



const formatAnime = (data: AnimeListItem) => {

  return {
    title: data.title_english,
    description: data.synopsis,
    coverImage: data.images.jpg.image_url,
    createdAt: data.aired.from,
    trailer: data.trailer.url,
  };
};

async function disconnect() {
  await prisma.$disconnect();
}

async function addAnime() {

    const fetchManga = process.env.FETCH_MANGA;
    const response = await axios.get(fetchManga);

    const apiData = response.data.data; 

    // maybe use a foreach to loop through each one to add ?
    for(const object of apiData) {
      const formattedData = formatAnime(object)
      console.log(formattedData)
      await prisma.anime.create({
        data: {
          title: formattedData.title,
          description: formattedData.description,
          coverImage: formattedData.coverImage,
          createdAt: formattedData.createdAt,
          trailer: formattedData.trailer,
        },
      })
    };      
     disconnect();
}


addAnime();
