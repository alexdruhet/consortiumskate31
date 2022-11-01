import React from 'react'
import { Link } from 'gatsby'
import * as styles from './navigation.module.css'

const siteMetadata = require('../../config/site-metadata')

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
      <span className={styles.title}>
        {siteMetadata.title}
      </span>
      <span className={styles.description}>
        {siteMetadata.description}
      </span>
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Accueil
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/les-membres" activeClassName="active">
          Les membres
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/dossiers" activeClassName="active">
          Dossiers
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/articles" activeClassName="active">
          Articles
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/contact" activeClassName="active">
          Nous écrire
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
