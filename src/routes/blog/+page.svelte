<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchRssFeed, type RssFeedItem } from '$lib/rss';

	let posts: RssFeedItem[] = $state([]);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			const feedUrl = 'https://thedakotascout.substack.com/feed';
			posts = await fetchRssFeed(feedUrl);

			if (posts.length === 0) {
				throw new Error('No posts found in feed');
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
			console.error('RSS Feed error:', errorMsg);
			error = errorMsg;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="flex flex-col gap-6 w-full sm:w-7/10">
	<h1>Blog</h1>

	{#if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<div class="space-y-6">
			{#each posts as post}
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
                            Read on Substack →
                        </a>
                    </div>
				</article>
			{/each}
		</div>
	{/if}
</div>