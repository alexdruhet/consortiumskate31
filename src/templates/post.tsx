import React from 'react'
import type { PageProps } from "gatsby"
import { Link, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
//import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './post.module.css'
import moment from 'moment'
import 'moment/locale/fr'
import PageContainer from '../components/page-container'

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
// @TODO: render references
// @see https://www.contentful.com/developers/docs/tutorials/general/rich-text-and-gatsby/

const PostTemplate = ({ location, pageContext, data }: PageProps<Queries.PostTemplateQuery>) => {

  moment.locale('fr')
  const post = data.contentfulPost
  const previous = data.previous
  const next = data.next
  const plainTextExtract = documentToPlainTextString(
    JSON.parse(post.extract.raw)
  )

  let heroImage = post.heroImage
  if (heroImage.filename === 'white.png') heroImage = null

  return (
    <Layout location={location}>
      <SEO
        title={post.title}
        description={plainTextExtract}
        image={post.heroImage.resize !== null && `http:${post.heroImage.resize.src}`}
      />
      <PageContainer>
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
      </PageContainer>
    </Layout>
  )

}

export default PostTemplate

export const query = graphql`
  query PostTemplate(
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