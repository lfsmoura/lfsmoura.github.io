import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../data/site-config';

export async function GET(context: any) {
  const posts = await getCollection('posts');

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = getDateFromSlug(a.slug);
    const dateB = getDateFromSlug(b.slug);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site,
    items: sortedPosts.map((post) => {
      const date = getDateFromSlug(post.slug);
      const parts = post.slug.split('-');
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      const slug = parts.slice(3).join('-');

      return {
        title: post.data.title,
        pubDate: date,
        link: `/${year}/${month}/${day}/${slug}`,
      };
    }),
  });
}

function getDateFromSlug(slug: string): Date {
  const parts = slug.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return new Date(`${year}-${month}-${day}T00:00:00Z`);
}
