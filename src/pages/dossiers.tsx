import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PageContainer from "../components/page-container"
import SEO from "../components/seo"
import PdfPreview from "../components/pdf-preview"

const title: string = 'Les dossiers';

const DossiersPage = ({ location, data }: PageProps<Queries.DossiersPageQuery>) => {
  return (
    <Layout location={location}>
      <SEO title={title} />
      <PageContainer>
        <h1 className="page-title">{title}</h1>
        <PdfPreview pdfs={data.allContentfulAsset?.nodes} />
      </PageContainer>
    </Layout>
  )
}

export default DossiersPage

export const query = graphql`
  query DossiersPage {
    allContentfulAsset(
      filter: { mimeType: { eq: "application/pdf" }, node_locale: { eq: "fr" } }
    ) {
      nodes {
        filename
        id
        node_locale
        mimeType
        publicUrl
        title
        url
        description
        updatedAt
      }
    }
  }
`;
