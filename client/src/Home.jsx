import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

function Home(props) {
  const [count, setCount] = useState(0);
  const user = props.user;

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
