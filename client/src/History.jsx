import { useState } from 'react'
import { useEffect } from 'react'
import FilledAntiderivative from './FilledAntiderivative.jsx'
import './style.css'

function History(props) {
  const [history, setHistory] = useState([]);

  const user = props.user;

  async function getHistory() {
    const res = await fetch("/history/", {
      credentials: "same-origin"
    });
    const serverHistory = await res.json();
    let newHistory = [];
    const keys = Object.keys(serverHistory);

    for (const key of keys) {
      const data = serverHistory[key];
      newHistory.push(<div key={data["id"]} className="filled-antiderivative">
        <FilledAntiderivative
          data={data}
          user={user}
        />
      </div>);
    }
    newHistory.reverse();
    setHistory(newHistory);

  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div id="history-container">
      <h1>History</h1>
      {history}
    </div>
  )
}

export default History;
