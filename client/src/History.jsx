import { useState } from 'react'
import { useEffect } from 'react'

function History() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Antiderivative Calculator</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default History;
