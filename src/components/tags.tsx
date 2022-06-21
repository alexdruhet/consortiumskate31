import React from 'react'
import { Link } from 'gatsby'
import * as styles from './tags.module.css'

type Props = {
  tags: null | string[]
}

const Tags = ({ tags }: Props): JSX.Element | null => {
  if (!tags || tags.length === 0) return null
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Link to={`/tags/${tag}`} key={tag} className={styles.tag}>
          🏷️ {tag}
        </Link>
      ))}
    </div>
  )
}

export default Tags
