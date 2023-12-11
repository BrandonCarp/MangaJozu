const axios = require("axios")
const TEST_TOKEN = process.env.TEST_TOKEN

const options = {
  method: "GET",
  url: "http://localhost:8080/api/private",
  headers: {
    authorization: `Bearer ${TEST_TOKEN}`,
  },
}

axios(options)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })

// const data = {
//   client_id: "u0MZ3NCbDW2Iwa5ZnpbMVC23AFEI6hey",
//   client_secret:
//     "8hqUUsj5bcSFQpywHwa-xSqGyhcZnw-KmsTbgHXcMxdRwMsFHB9YWG0t3-tp3bzz",
//   audience: "https://dev-7hi6cohckgtzdhik.us.auth0.com/api/v2/",
//   grant_type: "client_credentials",
// }

// axios
//   .post("https://dev-7hi6cohckgtzdhik.us.auth0.com/oauth/token", data, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
