import type { GatsbyNode } from "gatsby"
import * as path from "path"
import { extractTagsFromPosts } from './src/components/helpers'

type TypeData = {
  allContentfulPost: {
    nodes: Queries.ContentfulPost[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {

  const { createPage } = actions
  const Post = path.resolve('./src/templates/post.tsx')
  const Tag = path.resolve('./src/templates/tag.tsx')
  const result = await graphql<TypeData>(
    `
      {
        allContentfulPost(filter: { node_locale: { eq: "fr" } }) {
          nodes {
            title
            slug
            tags
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data?.allContentfulPost.nodes
  if (posts && posts.length > 0) {

    posts.forEach((post, index) => {
      const previousPostHasDemoTag: boolean | null | undefined = index > 0 && posts[index - 1] && posts[index - 1].tags && Array.isArray(posts[index - 1].tags) && posts[index - 1].tags?.includes('demo')
      const nextPostHasDemoTag: boolean | null | undefined = index < posts.length - 1 && posts[index + 1] && posts[index + 1].tags && Array.isArray(posts[index + 1].tags) && posts[index + 1].tags?.includes('demo')
      const previousPostSlug = previousPostHasDemoTag ? null : posts[index - 1] ? posts[index - 1].slug : null
      const nextPostSlug = nextPostHasDemoTag ? null : posts[index + 1] ? posts[index + 1].slug : null

      createPage({
        path: `/articles/${post.slug}/`,
        component: Post,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })

    const tags = extractTagsFromPosts(posts)
    if (tags.length > 0) {
      tags.forEach((tag: string) => {
        createPage({
          path: `/tags/${tag}/`,
          component: Tag,
          context: {
            tag: tag,
          },
        })
      })
    }
  }
}