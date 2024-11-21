import { useState } from 'react'
import { useEffect } from 'react'
import Antiderivative from './Antiderivative.jsx'
import './style.css'

function Home(props) {
  const [antiderivatives, setAntiderivatives] = useState([]);

  const user = props.user;

  async function getAntiderivatives() {
    const res = await fetch("/antiderivatives/", {
      credentials: "same-origin"
    });

    const serverAntiderivatives = await res.json();
    let newAntiderivatives = [];
    const keys = Object.keys(serverAntiderivatives);

    for (const key of keys) {
      const data = serverAntiderivatives[key];
      newAntiderivatives.push(<div key={data["id"]} className="antiderivative">
        <Antiderivative
          data={data}
          user={user}
        />
      </div>);
    }
    setAntiderivatives(newAntiderivatives);
  }

  useEffect(() => {
    getAntiderivatives();
  }, []);

  return (
    <div id="home-container">
      <h1>Antiderivative Calculator</h1>
      {antiderivatives}
    </div>
  )
}

export default Home;
