import prisma from "../prisma/client";
import {  userDetails } from "../middleware/interface";

async function createUser ({userName, email}: userDetails) {

  try {

    if (!userName || !email) {
      throw new Error('Incomplete user details');  
    }

    const createdUser = await prisma.customer.create({
      data: {
     userName: userName,
     email: email,
      } 
       })
console.log(createdUser)
  } catch (error) {
    console.log(`Error creating user:`, error)
  }
  
}


async function deleteUser({email}: userDetails) {
  try {
      const deletedUser =  await prisma.customer.delete({
        where: {
        email: email
        },
      })
      console.log(`Deleted user`, deletedUser)
  } catch (error){
    console.log(`Error creating user:`, error)
  }
}

async function updateUser({ userName, email}: userDetails) {
 try {
   const updatedUser = await prisma.customer.update({
    where: {
     email: email
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

async function FindUser() {
  try {
    const allUsers = await prisma.customer.findMany();
    console.log(`All Users`, allUsers)
 } catch (error){
   console.log(`Error Finding`, error)
 }
 }
 https://www.youtube.com/watch?v=r5L1XRZaCR0 - 9:11 
//  Connect new users to DB
module.exports = {
createUser,
deleteUser,
updateUser,
FindUser
}
// create multiple functions for adding/delete/updating users
// including update address/information - potentially different file
// 12/18/23   - Create a delete function & a edit function