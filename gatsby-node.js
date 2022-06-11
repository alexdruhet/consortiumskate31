const path = require('path')
const webpack = require('webpack')
const { extractTagsFromPosts } = require('./src/components/helpers')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        stream: require.resolve("stream-browserify"),
        //http: require.resolve("stream-http"),
        //https: require.resolve("https-browserify"),
        //util: require.resolve("util/"),
        //zlib: require.resolve("browserify-zlib"),
        //assert: require.resolve("assert/"),
      },
    },
    //externals : { canvas: {} },
    plugins: [
      // fix "process is not defined" error:
      // (do "npm install process" before running the build)
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const Post = path.resolve('./src/templates/post.js')
  const Tag = path.resolve('./src/templates/tag.js')

  const result = await graphql(
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

  const posts = result.data.allContentfulPost.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug =
        index === 0
          ? null
          : posts[index - 1].tags.includes('demo') &&
            !post.tags.includes('demo')
          ? null
          : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1
          ? null
          : posts[index + 1].tags.includes('demo') &&
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
