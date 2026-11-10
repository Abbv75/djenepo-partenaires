import { Grid } from '@chakra-ui/react'
import type { BlogPost } from '../../../types'
import { BlogCard } from './BlogCard'

interface BlogBentoGridProps {
  posts: BlogPost[]
  onPostClick: (post: BlogPost) => void
}

export const BlogBentoGrid = ({ posts, onPostClick }: BlogBentoGridProps) => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(12, 1fr)',
      }}
      gap={6}
      alignItems="stretch"
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          index={index}
          onClick={onPostClick}
        />
      ))}
    </Grid>
  )
}
