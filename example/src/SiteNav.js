import React from 'react'

export default function SiteHeader() {
  return (
    <header className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">ByteArk Player Container for React</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/">
              <span className="mr-1">&#8592;</span>
              <span>Back to Home</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
