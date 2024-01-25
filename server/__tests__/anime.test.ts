import supertest = require("supertest");
// import { createServer } from "../utils/app";
import { app } from "../server";
// const app = createServer();


describe('anime', () => {

  // What is being tested
  describe('get anime route', () => {

    // What condition being tested : given this condition
    // TEST 1 DOESNT EXIST
 describe('given the anime does not exist', () => {

  it('should return a 400', async () => {

  // expect(true).toBe(true)
  const page = "f"
  await supertest(app).get(`/anime?q=${page}`).expect(400);
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