import { Prisma, PrismaClient } from "@prisma/client";
const axios = require('axios');
// import { MangaItem } from "../../api/interface";

const prisma = new PrismaClient();

interface ApiMangaItem {
  title: string;
  synopsis: string;
  images: { jpg: { image_url: string } };
  published: { from: string };
  authors: Array<{ mal_id: number; name: string }>;
}

const formatManga = (apiData: ApiMangaItem) => {

  return {
    title: apiData.title,
    description: apiData.synopsis,
    coverImage: apiData.images.jpg.image_url,
    createdAt: new Date(apiData.published.from),
    author: { connect: { id: apiData.authors[0]?.mal_id || 1 } },
  };
};

async function addManga() {
  try {
    const fetchManga = process.env.FETCH_MANGA;
    const apiData = await axios.get(fetchManga);

    await prisma.$connect();
console.log(fetchManga)
    for ( i <apiData.data.length; i++) {
      const processedData = formatManga(data);

      await prisma.manga.create({
        data: {
          title: processedData.title,
          description: processedData.description,
          coverImage: processedData.coverImage,
          createdAt: processedData.createdAt,
          author: processedData.author,
        },
      });
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

// addManga();

async function testFunction() {
  const fetchManga = process.env.FETCH_MANGA;
  const apiData = await axios.get(fetchManga);

  
  console.log(apiData.data) 

}

testFunction();

// async function fetchDataAndStoreInDB() {
//   try {
//     // Fetch data from the API
//     const apiData = await axios.get('https://api.example.com/data');

//     // Process and transform the data if needed
//     const processedData = processApiData(apiData);

//     // Connect to the database
//     await prisma.$connect();

//     // Insert or update data in the database
//     await prisma.tableName.createMany({
//       data: processedData,
//       skipDuplicates: true,
//     });

//     // Disconnect from the database
//     await prisma.$disconnect();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Run the function manually or on a schedule
// fetchDataAndStoreInDB();