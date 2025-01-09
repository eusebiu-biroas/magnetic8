<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { KeyCode } from '$lib/constants/keycode.js';
	import { keyWatcherConfig, KeyWatcherMode } from '$lib/shared.svelte';
	import type CanvasContext from '$lib/types/CanvasContext';

	let canvasContext: CanvasContext = getContext('canvas');
	let isOpen = $state(false);

	function openModal() {
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
		keyWatcherConfig.mode = KeyWatcherMode.STANDARD;
	}

	function handleKeydown(event) {
		console.log(event);
		if (event.key === KeyCode.Escape) {
			closeModal();
			return;
		}

	}


	function saveImage() {
		canvasContext.saveCanvasToImage();
		closeModal();
	}

	function saveJson() {
		canvasContext.saveProgress(true);
		closeModal();
	}

	function saveToLocalStorage() {
		canvasContext.saveProgress(false);
		closeModal();
	}
</script>

<!-- Trigger button -->
<button id="saver"
				onclick={openModal}
				class=""
>
	<img alt="saver" class="w-[32px]" src="icons/save.svg" />
	{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
		<div class="absolute -bottom-4 bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">S</div>
	{/if}
</button>

<!-- Modal overlay -->
{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
			 onkeydown={handleKeydown}>
		<div
			class="relative w-full max-w-xl p-8"
		>
			<!-- Close button -->
			<button id="closeSaver"
				onclick={closeModal}
				class="absolute right-10 top-0 text-white hover:text-gray-300"
			>
				✕
			</button>

			<span class="text-white text-center text-2xl">Save progress</span>
			<div class="grid grid-cols-3 ">
				<button id="saveImage" onclick={saveImage}
								class="text-white text-center justify-center justify-center place-content-center items-center content-center">
					<img alt='save-i' class="w-[160px]" src="icons/image.svg" />
					<div class="absolute bottom-0  bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">A</div>

					<span class="">Image</span>

				</button>
				<button id="saveJson" onclick="{saveJson}" class="text-white">
					<img alt="save-json" class="w-[160px]" src="icons/file-json.svg" />
					<div class="absolute bottom-0  bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">S</div>

					File

				</button>
				<button id="saveLocalStorage" onclick={saveToLocalStorage} class="text-white">
					<img alt="save-local" class="w-[160px]" src="icons/storage.svg" />
					<div class="absolute bottom-0  bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">D</div>

					Local storage
				</button>
			</div>

		</div>
	</div>
{/if}
