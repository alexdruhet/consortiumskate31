import React from 'react'
import { Link } from 'gatsby'
import * as styles from './tags.module.css'

const Tags = ({ tags }) =>
  tags?.length > 0 && (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Link to={`/tags/${tag}`} key={tag} className={styles.tag}>
          🏷️ {tag}
        </Link>
      ))}
    </div>
  )

export default Tags
