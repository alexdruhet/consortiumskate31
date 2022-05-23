import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'
import { siteMetadata } from '../../gatsby-config'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      © {new Date().getFullYear()} {siteMetadata.title} - {siteMetadata.description}
    </div>
  </Container>
)

export default Footer
