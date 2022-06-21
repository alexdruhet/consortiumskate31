import React from 'react'
import * as styles from './footer.module.css'
import Social from './social';

const siteMetadata = require('../../config/site-metadata');

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.licence}>
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
        >
          <p>
            L'ensemble des contenus produits par le Consortium Skate 31 sont mis
            à disposition selon les termes de la{' '}
            <em>Licence Creative Commons Attribution CC BY-NC-ND 4.0</em> :
          </p>
          <img
            style={{ width: '88px', height: '31px' }}
            alt="Licence Creative Commons"
            src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png"
          />
          <ul>
            <li>copie, distribution et communication autorisées ;</li>
            <li>crédit obligatoire ;</li>
            <li>pas d&#39;utilisation commerciale ;</li>
            <li>pas de modification.</li>
          </ul>
        </a>
      </div>
      <div className={styles.right}>
        <Social />
        <div className={styles.copyright}>
          © 2021-{new Date().getFullYear()} {siteMetadata.title} -{' '}
          {siteMetadata.description}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
