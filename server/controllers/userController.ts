import prisma from "../prisma/client";
import { CustomerDetails } from "../middleware/interface";

async function createCustomer ({userId, userName, email, password, firstName, lastName}: CustomerDetails) {

  try {

    if (!userName || !email || !password || !firstName || !lastName) {
      throw new Error('Incomplete customer details');  
    }

    const createdUser = await prisma.customer.create({
      data: {
    id : userId,
     userName: userName,
     email: email,
     password: password,
     firstName: firstName,
     lastName: lastName
      } 


       })
console.log(createdUser)
  } catch (error) {
    console.log(`Error creating customer:`, error)
  }
  
}


async function deleteUser({userId}: CustomerDetails) {
  try {
      const deletedUser =  await prisma.customer.delete({
        where: {
        id: userId
        },
      })
      console.log(`Deleted user`, deletedUser)
  } catch (error){
    console.log(`Error creating customer:`, error)
  }
}


// create multiple functions for adding/delete/updating users
// including update address/information - potentially different file
// 12/18/23   - Create a delete function & a edit function