import { useState } from 'react';
import { useEffect } from 'react';
import { MathComponent } from 'mathjax-react';
import cookie from "cookie";
import './style.css';

const constKeys = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7};

function Antiderivative(props) {
  const [constInputs, setConstInputs] = useState({});
  const [constComponents, setConstComponents] = useState(null);
  const user = props.user;
  const data = props.data;

  function setConstInput(key, inputText) {
    let newConstState = constInputs;
    if (inputText === "" || isNaN(parseFloat(inputText))) {
      newConstState[key] = undefined;
    } else {
      newConstState[key] = parseFloat(inputText);
    }
    setConstInputs(newConstState);
  }

  // TODO: write this, adding to the history, and changing the page to the solution page.
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/solve/", {
      credentials: "same-origin",
      method: "POST",
      data: JSON.stringify({
        constInputs
        }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
      }
    });
  }

  useEffect(() => {
    let newConstantComponents = [];
    let newConstState = {};
    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
      if (key.length === 1) {
        newConstState[key] = setConstInput(key, "");
        newConstantComponents.push(<div key={constKeys[key]} className="const">
          <span>Set {key}: </span>
          <input type="text"
            value={newConstState[key]}
            onChange={(e) => setConstInput(key, e.target.value)}
          />
        </div>);
      }
    }
    setConstInputs(newConstState);
    setConstComponents(newConstantComponents);
  }, []);


  return (
    <>
      <div>{data["latexText"]}</div>
      <MathComponent tex={data["latexText"]} />
      <form className="const-container" onSubmit={handleSubmit}>
        {constComponents}
        <button>Get Solution</button>
      </form>
    </>
  )
}

export default Antiderivative;
