<script lang="ts">
	interface Props {
		theme: 'light' | 'dark';
		onToggleTheme: () => void;
	}

	const { theme, onToggleTheme } = $props();

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="hidden md:flex flex-wrap items-end justify-between gap-3">
  <div class="flex items-center gap-4">
    <a href="/" class="font-semibold link focus:outline-none text-xl">Home</a>
    <a href="/blog" class="font-semibold link text-xl">Blog</a>
    <a href="/portfolio" class="font-semibold link text-xl">Portfolio</a>
    <a href="/resume" class="font-semibold link text-xl">Resume</a> <!--todo - add download resume pdf button-->
  </div>
</nav>

<div class="md:hidden">
	<button
		type="button"
		class="inline-flex items-center justify-center gap-2 rounded border px-3 py-2 font-bold transition focus:outline-none z-50"
		on:click={toggleMobileMenu}
		aria-pressed={mobileMenuOpen ? 'true' : 'false'}
		aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
	>
		<i class="fas fa-bars"></i>
	</button>

	{#if mobileMenuOpen}
		<nav
			class="absolute left-0 right-0 top-full w-full z-40 flex flex-col gap-4 border-t px-6 py-4 animate-in fade-in slide-in-from-top-2 duration-200"
			style="background-color: var(--header-bg); color: var(--text);"
		>
			<a href="/" class="font-semibold link focus:outline-none" on:click={closeMobileMenu}>Home</a>
			<a href="/blog" class="font-semibold link" on:click={closeMobileMenu}>Blog</a>
			<a href="/portfolio" class="font-semibold link" on:click={closeMobileMenu}>Portfolio</a>
			<a href="/resume" class="font-semibold link" on:click={closeMobileMenu}>Resume</a>
			<div class="border-t pt-4 mt-2">
				<button
					type="button"
					class="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 font-bold transition theme-toggle-button focus:outline-none"
					on:click={() => {
						onToggleTheme();
					}}
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
			</div>
		</nav>
	{/if}
</div>

<style>
	@keyframes slideInFromTop {
		from {
			transform: translateY(-10px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	:global(.animate-in) {
		animation: slideInFromTop 0.2s ease-out;
	}

	:global(.fade-in) {
		animation: fadeIn 0.2s ease-out;
	}

	:global(.slide-in-from-top-2) {
		animation: slideInFromTop 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
