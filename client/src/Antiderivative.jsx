import { useState } from 'react'
import { useEffect } from 'react'
import { MathComponent } from 'mathjax-react';
import './style.css'

const constKeys = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7};

function Antiderivative(props) {
  const [constInputs, setConstInputs] = useState({});
  const user = props.user;
  const data = props.data;
  console.log(data);

  let constants = [];
  const dataKeys = Object.keys(data);

  // TODO: Figure out how to implement state here
  // Have the state be accessible by the constKey
  for (const key of dataKeys) {
    if (key.length === 1) {
      constants.push(<div key={constKeys[key]} className="const">
        <span>Set {key}: </span>
        <input type="text"/>
      </div>);
    }
  }

  return (
    <>
      <div>{data["latexText"]}</div>
      <MathComponent tex={data["latexText"]} />
      <form className="const-container">
        {constants}
      </form>
    </>
  )
}

export default Antiderivative;
