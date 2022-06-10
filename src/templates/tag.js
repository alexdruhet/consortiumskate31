import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import * as styles from './tag.module.css'

class TagTemplate extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulPost.nodes')
    const tag = get(this, 'props.pageContext.tag')

    return (
      <Layout location={this.props.location}>
        <Seo title={`Tous les articles taggués ${tag}`} />
        <Hero title={`Tous les articles taggués ${tag}`} />
        <ArticlePreview posts={posts} />
        <div styles={styles.tagNavigation}>
          <Link to={`/tags`}>
            Tous les tags
          </Link>
        </div>
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    allContentfulPost(
      filter: { node_locale: { eq: "fr" }, tags: { eq: $tag } }
    ) {
      nodes {
        title
        slug
        publishDate
        tags
        heroImage {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 424
            height: 262
          )
          filename
        }
        extract {
          raw
        }
      }
    }
  }
`
