import { Prisma, PrismaClient, } from "@prisma/client";

const axios = require('axios');
// import { MangaItem } from "../../api/interface";

const prisma = new PrismaClient();


export interface MangaListItem {
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    }
  }
  published: {
    from: string;
  }
  author: {
    name: string;
  }
}

export interface MangaListResponse {
  items: MangaListItem[];
}

const formatManga = (data: MangaListItem) => {

  return {
    title: data.title,
    description: data.synopsis,
    coverImage: data.images.jpg.image_url,
    createdAt: new Date(data.published.from),
    author: data.author.name,
  };
};


async function addManga() {
  try {
    const fetchManga = process.env.FETCH_MANGA;
    const apiData = await axios.get(fetchManga);

    await prisma.$connect();
// console.log(apiData.data.data)

const processedData  = await Promise.all(apiData.data.data.map((data: MangaListItem) => formatManga(data)))
console.log(`This is the data ${processedData} Processed data`)
   
      // const processedData =  formatManga(data);

      await prisma.manga.create({
        data: {
          title: processedData.title,
          description: processedData.description,
          coverImage: processedData.coverImage,
          createdAt: processedData.createdAt,
          author: processedData.author,
        },
      })
    

    // await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}



// addManga();

async function testFunction() {
  const fetchManga = process.env.FETCH_MANGA;
  const data = await axios.get(fetchManga);

  
  console.log(data.data) 

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