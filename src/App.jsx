import Signup from './Components/Signup'
import Login from './Components/Login'
import Input from './input'
import Analytics from './Analytics'
import './App.css'
import { useState } from 'react'

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