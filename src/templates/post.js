import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
//import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import readingTime from 'reading-time'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './post.module.css'
import moment from 'moment'
import 'moment/locale/fr'

const options = {
  //renderMark: {
  //  [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
  //},
  //renderNode: {
  //  [INLINES.HYPERLINK]: (node, children) => {
  //    const { uri } = node.data
  //    return (
  //      <a href={uri} className="underline">
  //        {children}
  //      </a>
  //    )
  //  },
  //  [BLOCKS.HEADING_2]: (node, children) => {
  //    return <h2>{children}</h2>
  //  },
  //  [BLOCKS.UL_LIST]: (node, children) => {
  //    return <li>{children}</li>
  //  },
  //},
}

class PostTemplate extends React.Component {
  render() {
    moment.locale('fr')
    const post = get(this.props, 'data.contentfulPost')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const plainTextExtract = documentToPlainTextString(
      JSON.parse(post.extract.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    let heroImage = post.heroImage
    if (heroImage.filename === 'white.png') heroImage = null

    return (
      <Layout location={this.props.location}>
        <Seo
          title={post.title}
          description={plainTextExtract}
          image={post.heroImage.resize !== null && `http:${post.heroImage.resize.src}`}
        />
        <Hero
          image={heroImage?.gatsbyImageData}
          title={post.title}
          content={post.extract}
        />
        <div className={styles.container}>
          <div className={styles.meta}>
            <div className={styles.author}>✍️ {post.author?.name}</div>{' '}
            <time dateTime={post.rawDate}>
              📆 {moment(post.publishDate).format('LL')}
            </time>{' '}
            <div className={styles.timeToRead}>
              ⏱️ {timeToRead} minute{timeToRead > 1 ? 's' : ''} de lecture
            </div>
            <Tags tags={post.tags} />
          </div>
          <div className={styles.article}>
            <div className={styles.body}>
              {renderRichText(post.body, options)}
            </div>
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/articles/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/articles/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
        filename
      }
      body {
        raw
      }
      tags
      extract {
        raw
      }
    }
    previous: contentfulPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
