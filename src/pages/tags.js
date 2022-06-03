import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import { extractTagsFromPosts } from '../components/helpers'

class TagsIndex extends React.Component {
  render() {
    const tags = extractTagsFromPosts(get(this, 'props.data.allContentfulPost.nodes'))

    return (
      <Layout location={this.props.location}>
        <Seo title="Tous les tags" />
        <Hero title="Tous les tags" />
        <Tags tags={tags} />
      </Layout>
    )
  }
}

export default TagsIndex

export const pageQuery = graphql`
  query TagsIndexQuery {
    allContentfulPost(filter: {node_locale: {eq: "fr"}, tags: {nin: "demo"}}) {
      nodes {
        title
        slug
        publishDate
        tags
      }
    }
  }
`
