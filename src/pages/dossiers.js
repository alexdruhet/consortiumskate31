import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PdfPreview from '../components/pdf-preview'
import Seo from '../components/seo'
import get from 'lodash/get'
import Hero from '../components/hero'

class DossiersIndex extends React.Component {
  render() {
    const pdfs = get(this, 'props.data.allContentfulAsset.nodes')
    return (
      <Layout location={this.props.location}>
        <Seo title="Les dossiers" />
        <Hero title="Les dossiers du consortium" />
        <PdfPreview pdfs={pdfs} />
      </Layout>
    )
  }
}

export default DossiersIndex

export const pageQuery = graphql`
  query DossiersIndexQuery {
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
`
