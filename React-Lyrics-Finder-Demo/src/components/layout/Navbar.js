/**
typing "rfc" + tab give us following functional component (dunction + arrow function)
import React from 'react'

export default function Navbar() {
    return (
        <div>
            
        </div>
    )

*/
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-5">
        <span className="span navbar-brand mb-0 h1 mx-auto">Lyrics Finder</span>
      </nav>
    </div>
  );
};
export default Navbar;
