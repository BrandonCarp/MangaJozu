import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";
import { CustomerDetails } from "../middleware/interface";

// Notes

// utilize JWT 
// Auth0 


// Customer example
// const customer = { 
//   userName: "HakariJordan1's",
//  email: "bcarpo@gmail.com",
// password: 'testpassword',
// firstName: "Brandon",
// lastName: "Carpenter"
// }


// https://manage.auth0.com/dashboard/us/dev-7hi6cohckgtzdhik/  Auth0


async function createCustomer ({userName, email, password, firstName, lastName}: CustomerDetails) {

  try {

    if (!userName || !email || !password || !firstName || !lastName) {
      throw new Error('Incomplete customer details');  
    }


    await prisma.customer.create({
      data: {
     userName: userName,
     email: email,
     password: password,
     firstName: firstName,
     lastName: lastName
      } 


       })

  } catch (error) {
    console.log(`Error creating customer:`, error)
  }
  
}


// createCustomer(customer);

 