import React, {useEffect, useState, } from 'react'



function Index() {

 const [message, setMessage] = useState<String>()

 const fetchManga = () => {
  
  fetch("http://localhost:8080/manga/search").then(
    Response => Response.json()
  ).then(
    data => {
      console.log(data.data.title)
      
setMessage(data.data.title)
      

    }
  )
 }
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
    <h1>JSON HERE: {message}</h1>
    
    <button className='bg-teal-600 px-2 py-1 rounded font-bold' onClick={fetchManga}>Click For Title
      </button></div>

  )
}

export default Index

// https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package