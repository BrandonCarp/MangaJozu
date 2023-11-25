import { PrismaClient } from "@prisma/client";
import prisma from "../../client";
import { CustomerDetails } from "../../../api/interface";

// Notes

// create function that creates new customer
// Must check that user is not duplicate
// utilize JWT 
// Auth0 


// Customer example
const customer = { 
  userName: "HakariJordan1's",
 email: "bcarpo@gmail.com",
password: 'testpassword',
firstName: "Brandon",
lastName: "Carpenter"
}



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


createCustomer(customer);

 