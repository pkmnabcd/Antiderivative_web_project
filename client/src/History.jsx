import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

function History(props) {
  const [count, setCount] = useState(0);

  const user = props.user;

  async function getHistory() {
    const res = await fetch("/history/", {
      credentials: "same-origin"
    });
    const serverHistory = await res.json();
    console.log(serverHistory);
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div id="history-container">
      <h1>Temp History Page</h1>
    </div>
  )
}

export default History;
