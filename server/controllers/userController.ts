// create multiple functions for adding/delete/updating users
// including update address/information - potentially different file
// 12/18/23   - Create a delete function & a edit function
import prisma from "../prisma/client";
import { CustomerDetails } from "../middleware/interface";

async function createCustomer ({userId, userName, email, password, firstName, lastName}: CustomerDetails) {

  try {

    if (!userName || !email || !password || !firstName || !lastName) {
      throw new Error('Incomplete customer details');  
    }

    const createdUser = prisma.customer.create({
      data: {
    userId : userId,
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

async function deleteUser({userId}: string) {
  try {
      const deletedUser =  prisma.customer.delete({
        where: {
        id: userId
        },
      })
  } catch {

  }
}
