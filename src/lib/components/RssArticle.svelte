<script lang="ts">
    import type { RssFeedItem } from "$lib/rss";

    interface Props {
		post: RssFeedItem;
        source: string;
	}

	const { post, source } = $props();

    function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<article class="border-b border-gray-200 pt-4 pb-6 last:border-b-0">				
    <!-- {#if post.img}
        <img src={post.img} alt={post.title} class="max-w-sm h-auto mb-4 rounded-2xl" />
    {/if}-->
    <h2 class="text-xl font-semibold mb-2">
        <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title}
        </a>
    </h2>
    <p class="text-sm mb-2 secondary-text">{formatDate(post.pubDate)}</p>
    <p class="mb-4">{post.excerpt}</p>
    <div class="flex flex-row w-full justify-end">
        <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            class="secondary-text hover:none text-sm"
        >
            Read on {source} →
        </a>
    </div>
</article>
