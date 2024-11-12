import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'
import Home from './Home.jsx'
import History from './History.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  function headerButtonLink(page) {
    if (!(currentPage == page)) {
      setCurrentPage(page);
    } else {
    }
  }

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";  // TODO: change this to / later since I want the front page to be accessible to people not logged in.
    } else {
      // handle logout failed!
    }
  }

  let component;
  if (currentPage == "home") {
    component = <Home />
  } else if (currentPage == "userHistory") {
    component = <History />
  }

  return (
    <div id="app-container">
      <div id="header">
        <button className="headerButton" onClick={() => {headerButtonLink("home")}}>Home</button>
        <button className="headerButton" onClick={() => {headerButtonLink("userHistory")}}>History</button>
      </div>
      {component}
    </div>
  )
}

export default App;
