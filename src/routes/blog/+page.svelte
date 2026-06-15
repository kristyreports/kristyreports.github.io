<script lang="ts">
	import { onMount } from 'svelte';

	interface BlogPost {
		title: string;
		excerpt: string;
		link: string;
		pubDate: string;
        img: string;
	}

	let posts: BlogPost[] = $state([]);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			const feedUrl = 'https://kristyreports.substack.com/feed';
			const corsProxy = 'https://corsproxy.io/?url=';
			const response = await fetch(corsProxy + encodeURIComponent(feedUrl));

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const text = await response.text();

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(text, 'text/xml');

			if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
				throw new Error('Failed to parse RSS feed');
			}

			const items = xmlDoc.querySelectorAll('item');

			if (items.length === 0) {
				throw new Error('No posts found in feed');
			}

			posts = Array.from(items).map((item) => {
				const title = item.querySelector('title')?.textContent || 'Untitled';
				const description = item.querySelector('description')?.textContent || '';
				const link = item.querySelector('link')?.textContent || '';
				const pubDate = item.querySelector('pubDate')?.textContent || '';
			    const img = item.querySelector('enclosure')?.getAttribute('url') || '';

				const excerpt = description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

				return { title, excerpt, link, pubDate, img};
			});
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

	{#if posts.length === 0 && !error}
		<p class="text-gray-500">Loading posts...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<div class="space-y-6">
			{#each posts as post}
				<article class="border-b border-gray-200 pt-4 pb-6 last:border-b-0">				
                    <!-- {#if post.img}
                        <img src={post.img} alt={post.title} class="max-w-sm h-auto mb-4 rounded-2xl" />
                    {/if}-->
                    <h2 class="text-xl font-semibold mb-2 hover:text-blue-600">
						<a href={post.link} target="_blank" rel="noopener noreferrer">
							{post.title}
						</a>
					</h2>
					<p class="text-sm text-gray-500 mb-2">{formatDate(post.pubDate)}</p>
					<p class="text-gray-700 mb-4">{post.excerpt}</p>
                    <div class="flex flex-row w-full justify-end">
                        <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-600 hover:none text-sm"
                        >
                            Read on Substack →
                        </a>
                    </div>
				</article>
			{/each}
		</div>
	{/if}
</div>