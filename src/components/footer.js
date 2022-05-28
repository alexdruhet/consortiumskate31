import React from 'react'
import * as styles from './footer.module.css'
import { siteMetadata } from '../../gatsby-config'

//<div className={styles.container}>
//<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
//  <img alt="Licence Creative Commons" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" />
//</a><br />Ce(tte) œuvre est mise à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Licence Creative Commons Attribution - Pas d&#39;Utilisation Commerciale - Pas de Modification 4.0 International</a>.
//</div>

const Footer = ({ lang = 'en' }) => (
  <footer className={styles.footer}>
    <div className={styles.copyright}>
      © {new Date().getFullYear()} {siteMetadata.title} -{' '}
      {siteMetadata.description}
    </div>
  </footer>
)

export default Footer
