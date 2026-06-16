import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        seo: {
            title: 'Blog | Kristy Reports',
            description: 'Latest articles, analysis and reporting from Kristy Moore.',
            // image: '/images/blog-social.png', // todo image?
            type: 'article',
            // twitterCard: 'summary_large_image'
        }
    };
};
