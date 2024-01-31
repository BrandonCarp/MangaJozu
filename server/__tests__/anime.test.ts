import supertest = require("supertest");
// import { createServer } from "../utils/app";
import { app } from "../server";




describe('/anime', () => {

  // What is being tested
  describe('get anime route', () => {

    // What condition being tested : given this condition
    // TEST 1 DOESNT EXIST
 describe('given the anime does not exist', () => {

  it('should return a 404', async () => {

  // expect(true).toBe(true) !!!
  const page = "f"
  const response = await supertest(app).get(`/anime?q=${page}`).expect(404);
  
})
 }),
//  TEST 2 ANIME RETURNED
 describe('given the anime data is returned',  () => {

  it('should return an object and a 200 status', async () => {
   
    const page = "1"
   const response =  await supertest(app).get(`/anime?q=${page}`).expect(200);

    expect(response.body).toBeDefined(); 

})
 })
  })
})
    
// Test anime/search
describe('/anime/search', () => {

})