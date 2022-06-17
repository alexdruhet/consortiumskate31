import * as React from "react"
import { WindowLocation } from "@reach/router"

import './variables.css'
import './elements.css'
import './commons.css'

import SEO from './seo'
import Navigation from './navigation'
import Footer from './footer'

interface PropsType {
  children?: React.ReactNode;
  location: WindowLocation;
}

const Layout = ({ children, location }: PropsType) => {
  return (
    <>
      <SEO />
      <Navigation />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default Layout