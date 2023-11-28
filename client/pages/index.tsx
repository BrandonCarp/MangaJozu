import React, {useEffect, useState, } from 'react'
const axios = require('axios');


function Index() {

 const [message, setMessage] = useState<String>("")

//  const fetchManga = () => {
  
//   fetch("http://localhost:8080/manga/search").then(
//     Response => Response.json()
//   ).then(
//     data => {
//       console.log(data.data.title)
      
// setMessage(data.data.title)
      

//     }
//   )
//  }

 async function fetchManga() {
  
  const apiResponse = await axios.get("http://localhost:8080/manga/search")

    console.log(apiResponse.data.data)
    setMessage(apiResponse.data.data)

 
}

// const fetchManga = () => {
  
//     fetch("http://localhost:8080/manga/search").then(
//       Response => Response.json()
//     ).then(
//       data => {
//         console.log(data.data)
        
//   // setMessage(data.data)
        
  
//       }
//     )
//    }
// useEffect(() => {
//   fetch("http://localhost:8080/manga/search").then(
//     Response => Response.json()
//   ).then(
//     data => {
//       // console.log(data)
      
// setMessage(data.message)
      

//     }
//   )
// }, [])

  return (
    <div>
    <h1>JSON HERE:</h1>
    
    
    <button className='bg-teal-600 px-2 py-1 rounded font-bold' onClick={fetchManga}>Click For Title
      </button>
      <ul >
        <li className='my-4'><a className='bg-teal-600 px-2 py-1 rounded font-bold' href='/login/'>Login</a></li>
        <li><a className='bg-teal-600 px-2 py-1 rounded font-bold' href='/logout/'>Logout</a></li>
      </ul>
      </div>

      

  )
}

export default Index

// https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kerne