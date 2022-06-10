import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import OrganizationPreview from '../components/organization-preview'

class OrganizationsIndex extends React.Component {
  render() {
    const organizations = get(
      this,
      'props.data.allContentfulOrganization.nodes'
    )

    return (
      <Layout location={this.props.location}>
        <Seo title="Les membres du Consortium Skate 31" />
        <Hero title="Les membres" />
        <OrganizationPreview organizations={organizations} />
      </Layout>
    )
  }
}

export default OrganizationsIndex

export const pageQuery = graphql`
  query OrganizationsIndexQuery {
    allContentfulOrganization(
      filter: { role: { eq: "member" }, node_locale: { eq: "fr" } }
      sort: { order: ASC, fields: name }
    ) {
      nodes {
        id
        name
        logo {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 424)
        }
        link
        description {
          raw
        }
      }
    }
  }
`
