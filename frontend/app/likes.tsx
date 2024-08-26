import React, { useState } from 'react'

import { json } from 'stream/consumers'

const Likes = () => {
  const [data, setData] = useState(undefined)

  fetch('http://127.0.0.1:8000/api/likes')
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch(() => alert('error'))

  return <></>
}

export default Likes

// import { FC, useEffect, useState } from "react"
// import React from "react";

// export const likes:FC = () => {
//     const [res, setRes] = useState<any>();
//   useEffect(() => {
//   setRes(fetch("http://127.0.0.1:8000/api/likes"))
//   }, [])
//     console.log(res)
//     return <></>
// }
