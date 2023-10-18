import React, {useEffect, useState, } from 'react'



function Index() {

 const [message, setMessage] = useState<String>()

useEffect(() => {
  fetch("http://localhost:7000/api/home").then(
    Response => Response.json()
  ).then(
    data => {
      // console.log(data)
      
setMessage(data.Brandon)
      

    }
  )
}, [])

  return (
    <div>{message}</div>
  )
}

export default Index

// https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package