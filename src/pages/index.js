import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Timeline from '../components/timeline'
//import Hero from '../components/hero'
//import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const milestones = get(this, 'props.data.allContentfulMilestone.nodes')
    const [consortium] = get(this, 'props.data.allContentfulOrganization.nodes')
    const content = consortium.name
    //return (
    //  <Layout location={this.props.location}>
    //    <Hero
    //      image={author.heroImage.gatsbyImageData}
    //      title={author.name}
    //      content={content}
    //    />
    //    <ArticlePreview posts={posts} />
    //  </Layout>
    //)

    return (
      <Layout location={this.props.location}>
        <Timeline milestones={milestones} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulJalon(sort: { fields: [date], order: DESC }) {
      nodes {
        id
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
    allContentfulOrganization(
      filter: { contentful_id: { eq: "40ZYzuaiU4F6K4EXie7NY1" } }
    ) {
      nodes {
        name
        description {
          raw
        }
      }
    }
  }
`
