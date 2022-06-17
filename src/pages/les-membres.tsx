import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PageContainer from "../components/page-container"
import SEO from "../components/seo"
import OrganizationPreview from "../components/organization-preview"

const title: string = 'Les membres';

const MembersPage = ({ location, data }: PageProps<Queries.MembersPageQuery>) => {
  return (
    <Layout location={location}>
      <SEO title={title} />
      <PageContainer>
        <h1 className="page-title">{title}</h1>
        <OrganizationPreview organizations={data.allContentfulOrganization?.nodes} />
      </PageContainer>
    </Layout>
  )
}

export default MembersPage

export const query = graphql`
  query MembersPage {
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
