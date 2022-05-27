const path = require('path')
const webpack = require('webpack')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify")
      }
    },
    plugins: [
      // fix "process is not defined" error:
      // (do "npm install process" before running the build)
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ]
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const Post = path.resolve('./src/templates/post.js')

  const result = await graphql(
    `
      {
        allContentfulPost(filter: { node_locale: { eq: "fr" } }) {
          nodes {
            title
            slug
            node_locale
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
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: Post,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
}
