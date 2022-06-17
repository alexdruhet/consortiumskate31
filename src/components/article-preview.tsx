import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Tags from './tags'
import * as styles from './article-preview.module.css'

import moment from 'moment'
import 'moment/locale/fr'

const ArticlePreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null
  moment.locale('fr')

  return (
      <ul className={styles.articleList}>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link to={`/articles/${post.slug}`} className={styles.link}>
                {post.heroImage && post.heroImage.filename !== 'white.png' && (
                  <GatsbyImage alt="" image={post.heroImage.gatsbyImageData} />
                )}
                <h2 className={styles.title}>{post.title}</h2>
              </Link>
              <div>{post.extract.raw && renderRichText(post.extract)}</div>
              <div className={styles.meta}>
                <time className="meta date" dateTime={post.publishDate}>
                  {moment(post.publishDate).format('LL')}
                </time>
                <Tags tags={post.tags} />
              </div>
            </li>
          )
        })}
      </ul>
  )
}

export default ArticlePreview
