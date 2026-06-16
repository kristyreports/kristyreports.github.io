import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => ({
  seo: {
    title: 'Portfolio | Kristy Reports',
    description: 'Selected published work and projects by Kristy Moore.',
    // image: '/images/portfolio-social.png', // todo - custom image?
    type: 'website'
  }
});