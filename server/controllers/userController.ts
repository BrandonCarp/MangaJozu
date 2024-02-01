import prisma from "../prisma/client";
import {  userDetails } from "../middleware/interface";


// figure out what to add 
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
    
    await prisma.customer.delete({
      where: {
        auth0Id: auth0Id,
      },
    }),

console.log(`Deleted user from Postgresql`, auth0Id);

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
