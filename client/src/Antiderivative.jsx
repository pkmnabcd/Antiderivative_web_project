import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

function Antiderivative(props) {
  const user = props.user;
  const data = props.data;

  return (
    <>
      <div>{data["latexText"]}</div>
    </>
  )
}

export default Antiderivative;
