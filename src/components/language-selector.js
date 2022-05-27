import React, { Component } from "react"
import { Link } from "gatsby"

function LanguageSelector({ classes, lang, location, className }) {
  if (lang === "default") {
    return (
      <Link className={className} to={`/${location.pathname}`}>
        French
      </Link>
    )
  } else {
    return (
      <Link
        className={className}
        to={location.pathname.replace("/" + lang + "/", "/")}
      >
        lang
      </Link>
    )
  }
}
export default LanguageSelector