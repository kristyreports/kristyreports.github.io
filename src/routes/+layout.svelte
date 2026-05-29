<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
	let theme = $state<'light' | 'dark'>('light');
	const THEME_KEY = 'site-theme';

	function applyTheme() {
		document.documentElement.dataset.theme = theme;
		document.documentElement.classList.toggle('dark', theme === 'dark');
		localStorage.setItem(THEME_KEY, theme);
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		applyTheme();
	}

	onMount(() => {
		const stored = localStorage.getItem(THEME_KEY);
		if (stored === 'dark' || stored === 'light') {
			theme = stored;
		} else {
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		applyTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</svelte:head>

<div class="scrolling-diagonal-bg min-h-screen">
	<div class="min-h-screen flex flex-col text-current bg-transparent">
		<header class="flex flex-row justify-between px-10 py-6">
			<div class="flex flex-row justify-center align-end gap-12 w-full">
				<div class="flex flex-col gap-1">
					<h2>Kristy Moore</h2>
					<h4>Journalist</h4>
				</div>
				<NavBar />
			</div>
			<button
				type="button"
				class="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 font-bold transition theme-toggle-button focus:outline-none"
				on:click={toggleTheme}
				aria-pressed={theme === 'dark'}
				aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#key theme}
					{#if theme === 'dark'}
						<i class="fas fa-sun"></i>
						<span>Light</span>
					{:else}
						<i class="fas fa-moon"></i>
						<span>Dark</span>
					{/if}
				{/key}
			</button>
		</header>

		<main class="flex flex-row items-start justify-center p-10">
			{@render children()}
		</main>
	</div>
</div>
