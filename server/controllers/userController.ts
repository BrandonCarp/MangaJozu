import prisma from "../prisma/client";
import {  userDetails } from "../middleware/interface";
import axios from "axios";
const MANAGEMENT_TOKEN = process.env.MANAGEMENT_TOKEN;
const AUTH0_API_URL = process.env.AUTH0_API_URL;


export  async function createUser ({auth0Id, userName, email}: userDetails) {
try {
    const createdUser = await prisma.customer.create({
      data: {
        auth0Id: auth0Id,
     userName: userName,
     email: email,
      } 
       })
console.log(createdUser)
  } catch (error) {
    console.log(`Error creating user:`, error)
  }
  
}



export async function deleteUser(auth0Id: string) {
  try {
    const auth0ApiUrl = `${AUTH0_API_URL}${auth0Id}` 
   const [prismaResult, auth0Result] = await Promise.allSettled([  await prisma.customer.delete({
      where: {
        auth0Id: auth0Id,
      },
    }),
   
  await axios.delete(auth0ApiUrl, {
  headers:  {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`
  }
})])
//     const deleteUserPrisma = await prisma.customer.delete({
//       where: {
//         auth0Id: auth0Id,
//       },
//     });
// const response = await axios.delete(auth0ApiUrl, {
//   headers:  {
//     Authorization: `Bearer ${MANAGEMENT_TOKEN}`
//   }
// });
// if (response.status !== 204) {
//   throw new Error(`Failed to delete user from Auth0. Status code: ${response.status}`);
// }


console.log(`Deleted user from Postgresql`, auth0Id);
console.log(`Deleted user from Auth0`, auth0Result);
  } catch (error){
    console.log(`Error deleting user:`, error)
  }
}



export async function updateUser({ userName, auth0Id}: userDetails) {
 try {
   const updatedUser = await prisma.customer.update({
    where: {
     auth0Id: auth0Id
    },
    data: {
      userName: userName,
    }
   })
   console.log(`Updated Username`, updatedUser)
} catch (error){
  console.log(`Error updating user name:`, error)
}
}

export async function FindUser() {
  try {
    const allUsers = await prisma.customer.findMany();
    console.log(`All Users`, allUsers)
 } catch (error){
   console.log(`Error Finding`, error)
 }
 }
