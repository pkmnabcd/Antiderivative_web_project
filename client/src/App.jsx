import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'
import Home from './Home.jsx'
import History from './History.jsx'
import Solution from './Solution.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  // TODO: Use this and make the solution component
  // and pass the relevant state to Home and to Antiderivative.
  const [solutionData, setSolutionData] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
      const res = await fetch('/user/', {
          credentials: "same-origin",
      });
      const body = await res.json();
      if (!("user" in body)) {
        setUser(null);
      } else {
        setUser(body.user);
      }
  }

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
      window.location = "/";
    } else {
      // handle logout failed!
    }
  }

  let header;
  if (!user) { // TODO: Figure out how to hear back from the server whether the user is logged in.
    header = (
      <div id="header">
        <button className="headerButton" onClick={() => {headerButtonLink("home")}}>Home</button>
        <button className="headerButton" onClick={() => {window.location = "/registration/sign_in"}}>Sign In</button>
        <button className="headerButton" onClick={() => {window.location = "/registration/sign_up"}}>Register</button>
      </div>
    )
  }
  else {
    header = (
      <div id="header">
        <button className="headerButton" onClick={() => {headerButtonLink("home")}}>Home</button>
        <button className="headerButton" onClick={() => {headerButtonLink("userHistory")}}>History</button>
        <button className="headerButton" onClick={() => {logout()}}>Sign Out</button>
      </div>
    )
  }


  let component;
  if (currentPage == "home") {
    component = <Home 
      user={user}
      setSolutionData={setSolutionData}
      setCurrentPage={setCurrentPage}
    />
  } else if (currentPage == "userHistory") {
    component = <History user={user} />
  } else if (currentPage == "solution") {
    component = <Solution solutionData={solutionData} />
  } else {
    component = <h1>Page Not Found!</h1>
  }

  return (
    <div id="app-container">
      {header}
      {component}
    </div>
  )
}

export default App;
