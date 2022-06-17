import type { GatsbyNode } from "gatsby"
import * as path from "path"
const { extractTagsFromPosts } = require('./src/components/helpers')

type TypePost = {
  id: string
  title: string
  slug: string
  tag?: Array<string>
}

type TypeData = {
  allPost: {
    nodes: TypePost[]
  }
}

//type Person = {
//  id: number
//  name: string
//  age: number
//}

//export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
//  actions,
//  createNodeId,
//  createContentDigest,
//}) => {
//  const { createNode } = actions
//
//  //const data = await getSomeData()
////
//  //data.forEach((person: Person) => {
//  //  const node = {
//  //    ...person,
//  //    parent: null,
//  //    children: [],
//  //    id: createNodeId(`person__${person.id}`),
//  //    internal: {
//  //      type: "Person",
//  //      content: JSON.stringify(person),
//  //      contentDigest: createContentDigest(person),
//  //    },
//  //  }
////
//  //  createNode(node)
//  //})
//}

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

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug =
        index === 0
          ? null
          : posts[index - 1].tags !== null &&
            posts[index - 1].tags.includes('demo') &&
            post.tags !== null &&
            !post.tags.includes('demo')
            ? null
            : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1
          ? null
          : posts[index + 1].tags !== null &&
            posts[index + 1].tags.includes('demo') &&
            post.tags !== null &&
            !post.tags.includes('demo')
            ? null
            : posts[index + 1].slug

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
      tags.forEach((tag, index) => {
        tag !== null &&
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