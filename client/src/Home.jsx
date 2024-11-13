import { useState } from 'react'
import { useEffect } from 'react'
import Antiderivative from './Antiderivative.jsx'
import './style.css'

function Home(props) {
  const [count, setCount] = useState(0);
  const user = props.user;

  // TODO: design this function. Either return the IDs of the unfilled antiderivatives.
  async function getAntiderivatives() {
    const res = await fetch("/antiderivatives/", {
      credentials: "same-origin"
    });

    const body = await res.json();
    console.log(body);
  }


  useEffect(() => {
    getAntiderivatives();
  }, []);

  // Get all the unfilled antiderivatives (make antiderivative components)
  // Make the key of the html elements the antiderivative ID.

  return (
    <div id="home-container">
      <h1>Antiderivative Calculator</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default Home;
