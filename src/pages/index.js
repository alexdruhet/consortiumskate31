import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Timeline from '../components/timeline'
import Organization from '../components/organization'

class RootIndex extends React.Component {
  render() {
    const milestones = get(this, 'props.data.allContentfulJalon.nodes')
    const consortium = get(this, 'props.data.contentfulOrganization')

    return (
      <Layout location={this.props.location}>
        <Organization
          image={consortium.logo.gatsbyImageData}
          title={consortium.name}
          content={consortium.description}
        />
        <Timeline milestones={milestones} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulJalon(
      filter: { node_locale: { eq: "fr" } }
      sort: { fields: [date], order: ASC }
    ) {
      nodes {
        id
        title
        date
        post {
          title
          slug
          publishDate
          tags
          extract {
            raw
          }
        }
      }
    }
    contentfulOrganization(id: { eq: "ed0f19fa-9d60-5a61-8f1f-4c3ba365c018" }) {
      name
      description {
        raw
      }
      logo {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE, width: 640)
      }
    }
  }
`
