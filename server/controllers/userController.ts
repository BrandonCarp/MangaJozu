import prisma from "../prisma/client";
import {  userDetails } from "../middleware/interface";
import axios from "axios";
import { auth } from "express-openid-connect";
require("dotenv").config();
const TEST_TOKEN = process.env.TEST_TOKEN;


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
// https://auth0.com/docs/api/management/v2/users/delete-users-by-id
// https://manage.auth0.com/dashboard/us/dev-7hi6cohckgtzdhik/apis/65637ad597a207546cfa2770/test
export async function deleteUser(auth0Id: string) {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://login.auth0.com/api/v2/users/${auth0Id}`, // Interpolate auth0Id
    headers: { }
  };

  

  try { 
    // auth0 Account Deletion
    console.log(auth0Id);
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));

    // Prisma Account Deletion
    // await prisma.customer.delete({
    //   where: {
    //     auth0Id: auth0Id,
    //   },
    // }),

    console.log(`Deleted user`, auth0Id);
  } catch (error) {
    console.log(`Error deleting user:`, error);
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
