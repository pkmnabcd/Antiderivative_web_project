import { useState } from 'react'
import { useEffect } from 'react'
import { MathComponent } from 'mathjax-react';
import './style.css'

const constKeys = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7};

function Antiderivative(props) {
  const [constInputs, setConstInputs] = useState({});
  const user = props.user;
  const data = props.data;

  function setConstInput(key, inputText) {
    let newConstState = constInputs;
    if (inputText === "" || isNaN(parseFloat(inputText))) {
      newConstState[key] = null;
    } else {
      newConstState[key] = parseFloat(inputText);
    }
    setConstInputs(newConstState);
  }

  // TODO: write this, adding to the history, and changing the page to the solution page.
  function handleSubmit() {
  }

  let constantComponents = [];
  let newConstState = {};
  const dataKeys = Object.keys(data);

  for (const key of dataKeys) {
    if (key.length === 1) {
      constantComponents.push(<div key={constKeys[key]} className="const">
        <span>Set {key}: </span>
        <input type="text"
          value={newConstState[key]}
          onChange={(e) => setConstInput(key, e.target.value)}
        />
      </div>);
    }
  }

  return (
    <>
      <div>{data["latexText"]}</div>
      <MathComponent tex={data["latexText"]} />
      <form className="const-container" onSubmit={handleSubmit}>
        {constantComponents}
        <button>Get Solution</button>
      </form>
    </>
  )
}

export default Antiderivative;
