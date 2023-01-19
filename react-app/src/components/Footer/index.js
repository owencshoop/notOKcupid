import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './Footer.css'

export default function Footer () {




  return (
    <>
    <div className="footer-container">
        <div className="technology-container">
          <span>Technologies: </span>
            <span>Flask</span>
            <span>React</span>
            <span>Redux</span>
            <span>PostgreSQL</span>
        </div>
        <div className="github-container">
          <span className="git-links">Creator Github Links: </span>
            <a href='https://github.com/owencshoop' className="git-links">Owen Shoop</a>
            <a href='https://github.com/alexvance9' className="git-links">Alex Vance</a>
            <a href='https://github.com/vinceviet' className="git-links">Vince Viet</a>
            <a href='https://github.com/nicisherenow' className="git-links">Nicholas Talbot</a>
        </div>
    </div>
    </>
  )
}
