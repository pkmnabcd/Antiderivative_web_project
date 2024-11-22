import { useState } from 'react'
import { useEffect } from 'react'
import Antiderivative from './Antiderivative.jsx'
import './style.css'

function History(props) {
  const [history, setHistory] = useState([]);

  const user = props.user;

  // TODO: Make FilledAntiderivative component and change this to reflect that
  async function getHistory() {
    const res = await fetch("/history/", {
      credentials: "same-origin"
    });
    const serverHistory = await res.json();
    console.log(serverHistory);
    let newHistory = [];
    const keys = Object.keys(serverHistory);

    for (const key of keys) {
      const data = serverHistory[key];
      newHistory.push(<div key={data["id"]} className="antiderivative">
        <Antiderivative
          data={data}
          user={user}
        />
      </div>);
    }
    setHistory(newHistory);

  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div id="history-container">
      <h1>Temp History Page</h1>
      {history}
    </div>
  )
}

export default History;
