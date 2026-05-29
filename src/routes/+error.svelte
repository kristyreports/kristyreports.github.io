<script>
    import { page } from '$app/stores';
</script>

<div class="flex flex-col items-end">
    <h1><i class="fa-solid fa-link-slash"></i> {$page.status}</h1>
    <p>{$page.error?.message || 'Page not found'}</p>
</div>