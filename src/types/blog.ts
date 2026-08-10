export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  image: string
  category: string
  publishedAt: string
  readTime: string
  author: {
    name: string
    initials: string
  }
  featured: boolean
}
