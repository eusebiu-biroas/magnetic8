<script lang="ts">
	import {
		keyWatcherConfig,
		KeyWatcherMode,
		selectedShapes,
		shapes
	} from '$lib/shared.svelte.js';
	import { onMount } from 'svelte';
	import Saver from '$lib/toolbars/Saver.svelte';
	import { shapesDefinition } from '$lib/constants/shapesDefinition';
	import Loader from '$lib/toolbars/Loader.svelte';


	onMount(() => {
		console.log('Mounted');
	});

	function addRectangle() {

	}

	function addCircle() {

	}

	function newCanvas() {
		selectedShapes.length = 0;
		shapes.length = 0;
	}
</script>


<div
	class="absolute top-5 right-0 left-0 w-fit max-w-[70%] mx-auto border-gray-500 border-2 bg-gray-700 bg-opacity-70 rounded-xl">
	{#if [KeyWatcherMode.STANDARD, KeyWatcherMode.SELECTION_TRANSLATION].includes(keyWatcherConfig.mode)}
		<div class=" absolute -top-3 -left-4 bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">I</div>
	{/if}
	<div class="grid grid-flow-col gap-2 p-2">
		{#each shapesDefinition as shapeDefinition}
			<button>
				<img class="w-[32px]" src={shapeDefinition.image} alt={shapeDefinition.type} />
				{#if keyWatcherConfig.mode == KeyWatcherMode.INSERT}
					<div
						class="absolute bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">{shapeDefinition.hint.toUpperCase()}</div>
				{/if}
			</button>
		{/each}

		<div class="w-px h-[100%] bg-gray-500"></div>
		<button id="newCanvas" onclick={newCanvas}>
			<img alt="new" class="w-[32px]" src="icons/new.svg" />

			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="absolute bg-amber-300 text-black px-2 -bottom-4 text-sm ml-1 rounded-sm">+</div>
			{/if}
		</button>

		<Saver></Saver>
		<Loader></Loader>

	</div>


</div>

<!--<svelte:window on:keydown|preventDefault={onKeyDown} />-->
