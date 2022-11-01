import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PageContainer from "../components/page-container"
import SEO from "../components/seo"
import ArticlePreview from "../components/article-preview"

const title: string = 'Tous les articles';

const ArticlesPage = ({ location, data }: PageProps<Queries.ArticlesPageQuery>) => {
  return (
    <Layout location={location}>
      <SEO title={title} />
      <PageContainer>
        <h1 className="page-title">{title}</h1>
        <ArticlePreview posts={data.allContentfulPost?.nodes} />
      </PageContainer>
    </Layout>
  )
}

export default ArticlesPage

export const query = graphql`
  query ArticlesPage {
    allContentfulPost(
      filter: { node_locale: { eq: "fr" }, tags: { nin: "demo" } }
      sort: { fields: [publishDate], order: DESC }
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
