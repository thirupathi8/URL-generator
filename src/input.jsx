import { useState } from 'react'
import "./input.css"

function Input() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate short Url")
      }

      const data = await response.json()
      setShortUrl(data.id)
    }
    catch (error) {
      console.error("Error:", error)
    }
  }
  return (
    <>
      <div className="input-container">
        <h1 className="input-title">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            placeholder="Paste your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-url"
          />
          <button type="submit" className="input-button">Generate Short URL</button>
        </form>
        {shortUrl && (
          <p className="input-result">
            Short URL: <a href={`http://localhost:3000/${shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3000/${shortUrl}`}</a>
          </p>
        )}
      </div>
    </>
  )
}

export default Input