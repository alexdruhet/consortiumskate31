import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PageContainer from "../components/page-container"
import SEO from "../components/seo"
import Tags from "../components/tags"
import { extractTagsFromPosts } from '../components/helpers'

const title: string = 'Tous les tags';

const TagsPage = ({ location, data }: PageProps<Queries.TagsPageQuery>) => {
  return (
    <Layout location={location}>
      <SEO title={title} />
      <PageContainer>
        <h1 className="page-title">{title}</h1>
        <Tags tags={extractTagsFromPosts(data.allContentfulPost?.nodes)}/>
      </PageContainer>
    </Layout>
  )
}

export default TagsPage

export const query = graphql`
  query TagsPage {
    allContentfulPost(
      filter: { node_locale: { eq: "fr" }, tags: { nin: "demo" } }
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
`;
