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

async function updateUser({userId, userName, email, password, firstName, lastName}: CustomerDetails) {
 try {
   const updatedUser = await prisma.customer.update({
    where: {
      id: userId
    },
    data: {
      userName: userName,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
   })
   console.log(`Updated User`, updatedUser)
} catch (error){
  console.log(`Error updating customer:`, error)
}
}

module.exports = {
createCustomer,
deleteUser,
updateUser
}
// create multiple functions for adding/delete/updating users
// including update address/information - potentially different file
// 12/18/23   - Create a delete function & a edit function