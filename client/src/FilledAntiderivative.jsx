import { useState } from 'react'
import { useEffect } from 'react'
import { MathComponent } from 'mathjax-react';
import './style.css'

function FilledAntiderivative(props) {
  const user = props.user;
  const data = props.data;

  const math = data["preSolutionLatex"] + " = " + data["postSolutionLatex"];

  return (
    <>
      <MathComponent tex={math} />
    </>
  )
}

export default FilledAntiderivative;
