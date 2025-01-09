<script>
	import Canvas from '$lib/Canvas.svelte';
	import ShapesToolbar from '$lib/toolbars/ShapesToolbar.svelte';
	import LayersToolbar from '$lib/toolbars/LayersToolbar.svelte';
	import { canvasStatus } from '$lib/shared.svelte';

	function setColor(value) {
		console.log('setColor', value);
	}
</script>

<main class="h-screen">
	<Canvas></Canvas>
	<LayersToolbar/>

<!--	<div class="absolute top-1/2 right-1/2" >-->
<!--		<input type="text" bind:value={canvasStatus.backgroundColor}>-->
<!--	</div>-->
</main>