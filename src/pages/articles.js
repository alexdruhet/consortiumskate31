import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class ArticlesIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulPost.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="Tous les articles" />
        <Hero title="Tous les articles" />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default ArticlesIndex

export const pageQuery = graphql`
  query ArticlesIndexQuery {
    allContentfulPost(
      filter: { node_locale: { eq: "fr" }, tags: { nin: "demo" } }
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
