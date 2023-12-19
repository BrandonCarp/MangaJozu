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
  url: string ;
 }
}

export interface AnimeListResponse {
  items: AnimeListItem[];
}


export  interface CustomerDetails {
  userId: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
 }

