import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Organization from "../components/organization"
import Timeline from "../components/timeline"

const IndexPage = ({ location, data }: PageProps<Queries.IndexPageQuery>) => {
  return (
    <Layout location={location}>
        <Organization
          image={data.contentfulOrganization?.logo?.gatsbyImageData}
          title={data.contentfulOrganization?.name}
          content={data.contentfulOrganization?.description}
        />
        <Timeline milestones={data.allContentfulJalon?.nodes} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    allContentfulJalon(
      filter: { node_locale: { eq: "fr" } }
      sort: { fields: [date], order: DESC }
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
`;
