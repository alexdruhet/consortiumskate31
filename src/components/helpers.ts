export const extractTagsFromPosts = (posts: Queries.ContentfulPost[]): string[] => {
  let tags: string[] = []
  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      tags = tags.concat(post.tags)
    }
  })
  return tags
}
