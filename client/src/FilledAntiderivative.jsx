import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

function FilledAntiderivative(props) {
  const user = props.user;
  const data = props.data;

  return (
    <>
      <div>{data["latexText"]}</div>
    </>
  )
}

export default FilledAntiderivative;
