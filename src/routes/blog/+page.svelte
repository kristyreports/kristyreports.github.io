<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchRssFeed, type RssFeedItem } from '$lib/rss';
    import RssArticle from '$lib/components/RssArticle.svelte';

	let posts: RssFeedItem[] = $state([]);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			const feedUrl = 'https://kristyreports.substack.com/feed';
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
</script>

<div class="flex flex-col gap-6 w-full sm:w-7/10">
	<h1>Blog</h1>

	{#if error}
		<p class="text-red-300">Error: {error}</p>
	{:else}
		<div class="space-y-6">
			{#each posts as post}
				<RssArticle {post} source="Substack" />
			{/each}
		</div>
	{/if}
</div>