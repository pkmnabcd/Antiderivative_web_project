import { useState } from 'react'
import { useEffect } from 'react'
import { MathComponent } from 'mathjax-react';
import './style.css'

function Solution(props) {
  const user = props.user;
  const setup = props.solutionData["setup"];
  const solution = props.solutionData["solution"];

  const fullEqn = setup + "=" + solution;

  return (
    <div id="solution-container">
      <h1>Temp Solution Page</h1>
      <MathComponent tex={fullEqn} />
    </div>
  )
}

export default Solution;
