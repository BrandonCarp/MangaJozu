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

// Switch to anime site or stay manga ?
async function addAnime() {

    const fetchManga = process.env.FETCH_MANGA;
    const response = await axios.get(fetchManga);

    const apiData = response.data.data; 

    
      apiData.forEach((object: MangaListItem) => {
        console.log(object); 
        
      });
    
}


addAnime();


// async function addManga() {
//   try {
//     const fetchManga = process.env.FETCH_MANGA;
//     const response = await axios.get(fetchManga);

//     const apiData = response.data.data; // Access the 'data' field from the response

//     if (Array.isArray(apiData)) {
//       apiData.forEach((object) => {
//         console.log(object); // Logging each manga object retrieved from the API
//         // Perform operations with each manga object as needed
//       });
//     } else {
//       console.error('Data is not in the expected array format');
//       console.log(apiData); // Check the structure of the received 'data' field
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Make sure to call the addManga function to execute the API call and processing
// addManga();

// console.log(`This is the data ${processedData} Processed data`)
   
      // const processedData =  formatManga(data);

  //     await prisma.manga.create({
  //       data: {
  //         title: processedData.title,
  //         description: processedData.description,
  //         coverImage: processedData.coverImage,
  //         createdAt: processedData.createdAt,
  //         author: processedData.author,
  //       },
  //     })
    

  //   // await prisma.$disconnect();
  // } catch (error) {
  //   console.error('Error:', error);
  // }




