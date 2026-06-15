<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchRssFeed, type RssFeedItem } from '$lib/rss';
    import RssArticle from '$lib/components/RssArticle.svelte';

	let posts: RssFeedItem[] = $state([]);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			const feedUrl = 'https://uwrfvoice.com/author/kmoore/feed/';
			posts = await fetchRssFeed(feedUrl, undefined);

			if (posts.length === 0) {
				throw new Error('No matching portfolio items found in feed');
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
			console.error('Portfolio RSS error:', errorMsg);
			error = errorMsg;
		}
	});
</script>

<div class="flex flex-col gap-6 w-full sm:w-7/10">
	<h1>Portfolio</h1>
    
	{#if error}
		<p class="text-red-300">Error: {error}</p>
	{:else}
		<div class="space-y-6">
			{#each posts as post}
				<RssArticle {post} source="Student Voice" />
			{/each}
		</div>
	{/if}
</div>
