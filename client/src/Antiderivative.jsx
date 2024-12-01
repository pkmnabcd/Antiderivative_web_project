import { useState } from 'react';
import { useEffect } from 'react';
import { MathComponent } from 'mathjax-react';
import * as cookie from "cookie";
import './style.css';

const constKeys = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7};

function Antiderivative(props) {
  const [constInputs, setConstInputs] = useState({});
  const [constComponents, setConstComponents] = useState(null);
  const [warningComponent, setWarningComponent] = useState(<div className="constantWarning"> </div>);

  const user = props.user;
  const data = props.data;
  const setSolutionData = props.setSolutionData;
  const setCurrentPage = props.setCurrentPage;

  function setConstInput(key, inputText) {
    let newConstState = constInputs;
    if (inputText === "" || isNaN(parseFloat(inputText))) {
      newConstState[key] = undefined;
      console.log(newConstState);
    } else {
      newConstState[key] = parseFloat(inputText);
      console.log(newConstState);
    }
    setConstInputs(newConstState);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: Validate that the warning works
    let validInputs = true;
    const constInputKeys = Object.keys(constInputs);
    for (const key of constInputKeys) {
      if (constInputs[key] === undefined) {
        validInputs = false;
      }
    }

    if (validInputs) {
      console.log(JSON.stringify({constants: constInputs}));
      const res = await fetch("/solve/", {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify({
          constants: constInputs,
          antiderivativeId: data["id"],
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
        }
      });
      const serverSolution = await res.json();
      const input = serverSolution["input"];
      const solution = serverSolution["solution"];
      const solutionState = {
        setup: input,
        solution: solution,
      };
      setWarningComponent(<div className="constantWarning"></div>);
      setSolutionData(solutionState);
      setCurrentPage("solution");
    } else {  // NOTE: Invalid Input
      setWarningComponent(<div className="constantWarning">Make sure that all the constants have numerical values inside, and that are all filled out.</div>);
    }
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
      <div>{data["inputLatex"]}</div>
      <MathComponent tex={data["inputLatex"]} />
      <form className="const-container" onSubmit={handleSubmit}>
        {constComponents}
        <button>Get Solution</button>
      </form>
      {warningComponent}
    </>
  )
}

export default Antiderivative;
