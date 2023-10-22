import { Prisma, PrismaClient } from "@prisma/client";
const axios = require('axios');
// import { MangaItem } from "../../api/interface";

const prisma = new PrismaClient();


// interface MangaItem {
//   title: string;
//   description: string;
//   genre: string;
//   coverImage: string;
//   createdAt: Date;
//   author: {
//     connect: { id: number };
//   };
// }

interface ApiMangaItem {
  title: string;
  description: string;
  // genres: { name: string }[];
  synopsis: string;
  createdAt: Date;
  images: { jpg: { image_url: string } };
  published: { from: string };
  author: {
    connect: { id: number };
  };
}



const formatManga = (apiData: ApiMangaItem) => {
  return {
    title: apiData.title,
    description: apiData.synopsis,
    // genre: apiData.genres[0]?.name, 
    coverImage: apiData.images.jpg.image_url,
    createdAt: new Date(apiData.published.from), 
    author: { connect: { id: 1 } },
  };
};


// async function addManga() {
//   try {
//     const fetchManga = process.env.FETCH_MANGA;
//     const apiData = await axios.get(fetchManga);

//     const processedData = formatManga(apiData.data); 

//     await prisma.$connect();

//     await prisma.manga.create({ data: processedData });
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// addManga();



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