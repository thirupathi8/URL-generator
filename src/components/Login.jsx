import { useState } from 'react'
import "../input.css"

function Login({ onLoginComplete }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        onLoginComplete()
      } 
      
      else {
        const errorMessage = await response.text()
        console.error("Login failed:", errorMessage)
      }

    }
    catch (error) {
      console.error("Error:", error)
    }
  }
  return (
    <>
      <div className="input-container">
        <h1 className="input-title">Login</h1>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-url"
          />
          <input
            type="text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-url"
          />
          <button type="submit" className="input-button">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login