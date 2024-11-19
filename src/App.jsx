import Signup from './Components/Signup'
import Login from './Components/Login'
import Input from './input'
import Analytics from './Analytics'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleSignUp = () => {
    setIsSignedUp(true)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const checkSession = async () => {
    const token = localStorage.getItem("sessionToken")
    if (token) {
      try {
        const response = await fetch("http://localhost:3000/user/validate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
        )

        if (response.ok) {
          setIsLoggedIn(true)
        }
        else {
          localStorage.removeItem("sessionToken")
        }
      }
      catch (error) {
        console.error("Error validating token: ", error)
      }
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <div className="App">
      <h1>Custom URL Generator</h1>
      {!isSignedUp && !isLoggedIn ? (
        <>
          <button onClick={() => setShowLogin(false)} className="input-button">Sign Up</button>
          <button onClick={() => setShowLogin(true)} className="input-button">Login</button>
          {showLogin ? (
            <Login onLoginComplete={handleLogin} />
          ) : (
            <Signup onSignUpComplete={handleSignUp} />
          )}
        </>
      ) : (
        <>
          <Input />
          <Analytics />
        </>
      )}
    </div>
  )
}

export default App