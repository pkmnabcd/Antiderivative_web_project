import { useState } from 'react'
import { useEffect } from 'react'
import { MathComponent } from 'mathjax-react';
import './style.css'

function Antiderivative(props) {
  const user = props.user;
  const data = props.data;

  return (
    <>
      <div>{data["latexText"]}</div>
      <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
    </>
  )
}

export default Antiderivative;
