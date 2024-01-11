import { Request, Response } from "express";
import prisma from "../prisma/client";
import {  userDetails } from "../middleware/interface";

async function createUser ({auth0Id, userName, email}: userDetails) {
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

export async function handleAuthCallBack( {auth0Id, userName, email}: userDetails,req: Request, res: Response, ){
  try {
  // console.log(req.oidc)
  // const sub = req.oidc?.user?.sub;
  // const userInfo  = {
  //   auth0Id : req.oidc?.user?.sub,
  //   userName: req.oidc?.user?.nickName,
  //   email: req.oidc?.user?.name
  //  }

  const existingUser = await prisma.customer.findFirst({
    where: {
      auth0Id: auth0Id
    },
    
  })
  if(existingUser) {
    console.log('Existing user logged in:', existingUser);
  } else {              
   
   await createUser({auth0Id: auth0Id,
    userName: userName,
    email: email,})
  }
  } catch(error){
    console.error(error)
  }
}



async function deleteUser({auth0Id}: userDetails) {
  try {
      const deletedUser =  await prisma.customer.delete({
        where: {
        auth0Id: auth0Id
        },
      })
      console.log(`Deleted user`, deletedUser)
  } catch (error){
    console.log(`Error creating user:`, error)
  }
}

async function updateUser({ userName, auth0Id}: userDetails) {
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
};
// create multiple functions for adding/delete/updating users
// including update address/information - potentially different file
// 12/18/23   - Create a delete function & a edit function