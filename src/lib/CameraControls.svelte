<script lang="ts">
	import { camera, canvasStatus, keyWatcherConfig, KeyWatcherMode } from '$lib/shared.svelte';
	let left = $derived(Math.round(camera.x));
	let right = $derived(Math.round(canvasStatus.width + camera.x));
	let maxWidth = $derived(Math.abs(canvasStatus.xMin) + canvasStatus.xMax);
	let xWidth = $derived(canvasStatus.width * 100 / maxWidth);
	let xMarginLeft = $derived((camera.x - canvasStatus.xMin) * 100 / maxWidth);

	let top = $derived(camera.y);
	let bottom = $derived(canvasStatus.height + camera.y);
	let maxHeight = $derived(Math.abs(canvasStatus.yMin) + canvasStatus.yMax);
	let maxZoom = $derived(Math.abs(canvasStatus.zMin) + canvasStatus.zMax);
	let yWidth = $derived(canvasStatus.height * 100 / maxHeight);
	let zWidth = $derived(1 / maxZoom*100);
	let yMarginLeft = $derived((camera.y - canvasStatus.yMin) * 100 / maxHeight);
	// let zMarginLeft = $derived((camera.z - canvasStatus.zMin) * 100 / maxZoom);
	let zMarginLeft = $derived(0);

	let zoom = $derived(Math.round(camera.z * 100));
</script>

<div class="absolute right-0 left-0 mx-auto bottom-0 grid grid-flow-row w-[100%] bg-gray-700 bg-opacity-10">
	<div class="grid grid-cols-10 text-blue-300">
		<div class="col-span-2 pr-2 flex inline-flex place-content-end">
			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="bg-amber-300 text-black px-2 h-[80%] text-sm mr-1 rounded-sm"> 🔍 N</div>
			{/if}
			{#if keyWatcherConfig.mode !== KeyWatcherMode.STANDARD}
				<div class="absolute left-10  bg-gray-700 text-white px-2 text-sm rounded-sm">
					<svg class="w-[30px]"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
							 xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier"> <path style="fill:#ffffff;"
																							 d="M512,307.863c0,70.124-57.048,127.172-127.172,127.172h-61.575c-4.746,0-8.898-2.561-11.135-6.376 c-1.151-1.914-1.798-4.164-1.798-6.557c0-7.139,5.794-12.933,12.933-12.933h61.575c55.858,0,101.306-45.447,101.306-101.306 S440.686,206.57,384.828,206.57c-0.698,0-348.73,0-348.73,0L55.2,227.975l35.139,39.382l19.089,21.391 c4.746,5.341,4.281,13.515-1.048,18.262c-2.47,2.199-5.535,3.285-8.601,3.285c-3.557,0-7.1-1.461-9.661-4.32l-34.454-38.618 L7.541,213.412c-4.32-4.837-6.777-10.735-7.385-16.761c-0.142-1.332-0.181-2.677-0.142-4.022c0.233-6.738,2.742-13.412,7.527-18.779 l49.262-55.225L90.12,81.286c4.759-5.328,12.933-5.794,18.262-1.035c5.328,4.759,5.794,12.933,1.048,18.262l-17.938,20.111 l-55.393,62.079c0,0,348.032,0,348.73,0C454.952,180.704,512,237.739,512,307.863z"></path>
							<path style="fill:#94E7EF;"
										d="M486.134,307.863c0,55.858-45.447,101.306-101.306,101.306h-61.575 c-6.919,0-12.571,5.432-12.92,12.274c0.168-11.886,5.044-22.62,12.868-30.432c7.954-7.954,18.947-12.881,31.091-12.881h30.535 c18.857,0,36.575-7.411,49.896-20.861c13.321-13.451,20.551-31.234,20.37-50.103c-0.375-38.347-32.462-69.555-71.546-69.555H63.801 l-8.601-9.635L36.098,206.57c0,0,348.032,0,348.73,0C440.686,206.57,486.134,252.004,486.134,307.863z"></path> </g></svg>
					ESC
				</div>
			{/if}
			Z: {zoom}%
		</div>
		<div class="col-span-6 place-content-center">
			<div class="w-full rounded-full bg-gray-700 h-2.5">

				<div class="bg-blue-600 h-2.5 rounded-full hover:cursor-grab active:cursor-grabbing z-1"
						 style="width: {zWidth}%; margin-left: {zMarginLeft}%;"></div>
			</div>
		</div>
		<div class="col-span-2 pl-2 flex inline-flex">Z: {zoom}
			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="bg-amber-300 text-black px-2 h-[80%] text-sm ml-1 rounded-sm">M 🔎️</div>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-10 text-green-300">
		<div class="col-span-2 pr-2 flex inline-flex place-content-end">
			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="bg-amber-300 text-black px-2 h-[80%] text-sm mr-1 rounded-sm"> ⬇️ J</div>
			{/if}Y: {top}</div>
		<div class="col-span-6 place-content-center">
			<div class="w-full rounded-full bg-gray-700 h-2.5">

				<div class="bg-green-600 h-2.5 rounded-full hover:cursor-grab active:cursor-grabbing z-1"
						 style="width: {yWidth}%; margin-left: {yMarginLeft}%;"></div>
			</div>
		</div>
		<div class="col-span-2 pl-2 flex inline-flex">Y: {bottom}
			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="bg-amber-300 text-black px-2 h-[80%] text-sm ml-1 rounded-sm">K ⬆️</div>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-10 text-red-300">
		<div class="col-span-2 pr-2 flex inline-flex place-content-end">
			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="bg-amber-300 text-black px-2 h-[80%] text-sm mr-1 rounded-sm"> ⬅️ H</div>
			{/if}X: {left}</div>
		<div class="col-span-6 place-content-center">
			<div class="w-full rounded-full bg-gray-700 h-2.5">
				<div class="bg-red-600 h-2.5 rounded-full hover:cursor-grab active:cursor-grabbing"
						 style="width: {xWidth}%; margin-left: {xMarginLeft}%;"></div>
			</div>
		</div>
		<div class="col-span-2 pl-2 flex inline-flex">X: {right}
			{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
				<div class="bg-amber-300 text-black px-2 h-[80%] text-sm ml-1 rounded-sm">L ➡️</div>
			{/if}
		</div>
	</div>
</div>