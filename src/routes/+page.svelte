<script>
	import profilePhoto from '$lib/assets/profile-photo.jpeg';
    import bio from '$lib/data/bio';

</script>

<div class="flex flex-col sm:flex-row sm:items-stretch gap-8 w-full sm:w-9/10 md:w-8/10 lg:w-7/10">
    <img src={profilePhoto} class="w-full sm:w-1/2 lg:w-1/3 sm:max-h-fit rounded-2xl sm:object-cover" alt="Kristy dressed professionally smiling at the camera" />
    <div class="flex flex-col w-full self-stretch justify-center sm:w-1/2 lg:w-2/3 gap-2">
        <h1 class="text-6xl tracking-wider">{bio.firstLine}</h1>
        <p class="tracking-normal">{bio.body}</p>
    </div>
</div>

