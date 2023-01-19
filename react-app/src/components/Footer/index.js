import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './Footer.css'

export default function Footer () {




  return (
    <>
    <div className="footer-container">
        <div className="tech-outer-container">
          <span>Technologies: </span>
        <div className="technology-container">
          <div className="tech-container-1">
            <span>Flask</span>
            <span>React</span>
            <span>Redux</span>
            <span>PostgreSQL</span>
          </div>
          <div className="tech-container-2">
            <span>SQLalchemy</span>
            <span>Alembic</span>
            <span>Python 3</span>
            <span>Html/CSS</span>
          </div>
          <div className="tech-container-3">
            <span>Node.js</span>
            <span>JSX</span>
            <span>Javascript</span>
            <span>SQLite3</span>
          </div>
        </div>
        </div>
        <div className="github-container">
          <span className="git-links-title">Creator Github Links: </span>
            <a href='https://github.com/owencshoop' className="git-links">Owen Shoop</a>
            <a href='https://github.com/alexvance9' className="git-links">Alex Vance</a>
            <a href='https://github.com/vinceviet' className="git-links">Vince Viet</a>
            <a href='https://github.com/nicisherenow' className="git-links">Nicholas Talbot</a>
        </div>
        <div className="linkedin-container">
          <span className="linkedin-links-title">Creator LinkedIn Links: </span>
            <a href='https://www.linkedin.com/in/owen-shoop-62ba36231/' className="linkedin-links">Owen Shoop</a>
            <a href='https://www.linkedin.com/in/alex-vance-503537234/' className="linkedin-links">Alex Vance</a>
            <a href='https://www.linkedin.com/in/vincent-viet-72349272/' className="linkedin-links">Vince Viet</a>
            <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links">Nicholas Talbot</a>
        </div>
    </div>
    </>
  )
}
