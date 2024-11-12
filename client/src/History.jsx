import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

function History() {
  const [count, setCount] = useState(0);

  return (
    <div id="history-container">
      <h1>Temp History Page</h1>
    </div>
  )
}

export default History;
