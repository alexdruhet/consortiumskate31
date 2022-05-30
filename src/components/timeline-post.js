import React from 'react'
import { Link } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import * as styles from './timeline-post.module.css'

const TimelinePost = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <ul className={styles.timelinePostList}>
      {posts.map((post) => {
        return (
          <li key={post.slug}>
            <Link to={`/articles/${post.slug}`} className={styles.link}>
              <strong className={styles.title}>{post.title}</strong><br/>
              {post.extract.raw && renderRichText(post.extract)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default TimelinePost
