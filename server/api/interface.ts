// model Manga {
//   id          Int       @id @default(autoincrement())
//   title       String    @db.VarChar(255)
//   description String
//   genre       String
//   coverImage  String
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime? @updatedAt
//   author      Author    @relation(fields: [authorId], references: [id])
//   authorId    Int
//   // Chapter     Chapter[]
//   Cart        Cart?     @relation(fields: [cartId], references: [id])
//   cartId      Int?
// }

export interface MangaItem {
  title: string;
  description: string;
  genre: string;
  coverImage: string;
  createdAt: Date; 
  author: {
    connect: { id: number }; 
  };
}


// title = data.titles[0].title

// description = data.synopsis

// genre = data.genres[0].name

// coverImage = data.images.jpg.image_url

// createdAt = data.published.from

// author = data.authors[0].name

//authorId = author.id


