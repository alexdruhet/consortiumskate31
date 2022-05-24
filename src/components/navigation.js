import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'
import { siteMetadata } from '../../gatsby-config'

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
      <span className={styles.navigationItem}>{siteMetadata.title} - {siteMetadata.description}</span>
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Accueil
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
