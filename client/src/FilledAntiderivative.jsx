import { useState } from 'react'
import { useEffect } from 'react'
import { MathComponent } from 'mathjax-react';
import './style.css'

function FilledAntiderivative(props) {
  const user = props.user;
  const data = props.data;

  return (
    <>
      <div>{data["postSolutionLatex"]}</div>
      <MathComponent tex={data["postSolutionLatex"]} />
    </>
  )
}

export default FilledAntiderivative;
