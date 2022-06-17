import React from 'react'
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import PageContainer from '../components/page-container'

const TagTemplate = ({ location, pageContext, data }: PageProps<Queries.TagTemplateQuery>) => {
  const tag = pageContext.tag
  const title: string = `Tous les articles taggués ${tag}`

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

export default TagTemplate

export const query = graphql`
  query TagTemplate($tag: String!) {
    allContentfulPost(
      filter: { node_locale: { eq: "fr" }, tags: { eq: $tag } }
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