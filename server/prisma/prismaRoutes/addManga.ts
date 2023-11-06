import { Prisma, PrismaClient, } from "@prisma/client";

const axios = require('axios');
// import { MangaItem } from "../../api/interface";

const prisma = new PrismaClient();


export interface MangaListItem {
  title: string;
  synopsis: string;
  trailer: {
    images: {
   
      image_url: string;
  
  }}
  aired: {
    from: string | Date | undefined ;
  }
  title_japanese: string,
}

export interface MangaListResponse {
  items: MangaListItem[];
}




const formatManga = (data: MangaListItem) => {

  return {
    title: data.title,
    description: data.synopsis,
    trailer: data.trailer.images.image_url,
    createdAt: data.aired.from,
    title_japanese: data.title_japanese,
  };
};

async function disconnect() {
  await prisma.$disconnect();
}

// Switch to anime site or stay manga ?
async function addAnime() {

    const fetchManga = process.env.FETCH_MANGA;
    const response = await axios.get(fetchManga);

    const apiData = response.data.data; 

    for(const object of apiData) {
      const formattedData = formatManga(object)
      await prisma.manga.create({
        data: {
          title: formattedData.title,
          description: formattedData.description,
          coverImage: formattedData.trailer,
          createdAt: formattedData.createdAt,
          author: formattedData.title_japanese,
        },
      })
      
    };

      // apiData.forEach((object: MangaListItem) => {
      //   const formattedData = formatManga(apiData)
      //   await prisma.manga.create({
      //     data: {
      //       title: formattedData.title,
      //       description: formattedData.description,
      //       coverImage: formattedData.coverImage,
      //       createdAt: formattedData.createdAt,
      //       author: formattedData.author,
      //     },
      //   })
        
      // });
      
     disconnect()
}


addAnime();

      // const processedData =  formatManga(data);

      // await prisma.manga.create({
      //   data: {
      //     title: processedData.title,
      //     description: processedData.description,
      //     coverImage: processedData.coverImage,
      //     createdAt: processedData.createdAt,
      //     author: processedData.author,
      //   },
      // })
    

