import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './hero.module.css'

const Hero = ({ image, title, content }) => (
  <div className={!image ? styles.heroNoImg : styles.hero}>
    {image==2 && (
      <GatsbyImage className={styles.image} alt={title} image={image} />
    )}
    <div className={styles.details}>
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <div className={styles.content}>{renderRichText(content, {})}</div>
      )}
    </div>
  </div>
)

export default Hero
