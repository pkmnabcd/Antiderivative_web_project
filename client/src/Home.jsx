import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

function Home() {
  const [count, setCount] = useState(0);

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
