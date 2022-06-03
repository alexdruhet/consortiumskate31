const extractTagsFromPosts = (posts) => {
  let tags = []
  posts.forEach((post) => {
    tags = tags.concat(post.tags)
  })
  return tags
}

module.exports.extractTagsFromPosts = extractTagsFromPosts
