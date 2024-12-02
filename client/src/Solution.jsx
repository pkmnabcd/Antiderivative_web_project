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
      <h1>Solution</h1>
      <div id="solution-math">
        <MathComponent tex={fullEqn} />
      </div>
    </div>
  )
}

export default Solution;
