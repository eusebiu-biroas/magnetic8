<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { KeyCode } from '$lib/constants/keycode.js';
	import { keyWatcherConfig, KeyWatcherMode } from '$lib/shared.svelte';
	import type CanvasContext from '$lib/types/CanvasContext';

	let canvasContext: CanvasContext = getContext('canvas');
	let isOpen = $state(false);
	let importJsonFile = false;

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


	function loadJson() {
		importJsonFile = false;
		openFileDialog();
		closeModal();
	}

	function importJson() {
		importJsonFile = true;
		openFileDialog();
		closeModal();
	}


	function loadFromLocalStorage() {
		canvasContext.loadProgress('',false);
		closeModal();
	}

	const handleFileSelect = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const text = await file.text();
			try {
				// fileContent = JSON.parse(text);
				canvasContext.loadProgress(text,importJsonFile);
				// console.log(fileContent);
			} catch (error) {
				console.error('Invalid JSON file', error);
			}
		}
	};

	const openFileDialog = () => {
		document.getElementById('fileInput')?.click();
	};
</script>

<!-- Trigger button -->
<button id="loader"
				onclick={openModal}
				class=""
>
	<img alt="saver" class="w-[32px]" src="icons/open2.svg" />
	{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
		<div class="absolute -bottom-4 bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">O</div>
	{/if}
</button>
<input
	id="fileInput"
	type="file"
	accept="application/json"
	onchange={handleFileSelect}
	style="display: none"
/>
<!-- Modal overlay -->
{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
			 onkeydown={handleKeydown}>
		<div
			class="relative w-full max-w-xl p-8"
		>
			<!-- Close button -->
			<button id="closeLoader"
				onclick={closeModal}
				class="absolute right-10 top-0 text-white hover:text-gray-300"
			>
				✕
			</button>

			<span class="text-white text-center text-2xl">Load progress</span>
			<div class="grid grid-cols-3 ">
				<button id="loadJson" onclick={loadJson}
								class="text-white text-center justify-center justify-center place-content-center items-center content-center">
					<img alt='save-i' class="w-[160px]" src="icons/open3.svg" />
					<div class="absolute bottom-0  bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">A</div>

					<span class="">Open from file</span>

				</button>
				<button id="importJson" onclick="{importJson}" class="text-white">
					<img alt="save-json" class="w-[160px]" src="icons/import.svg" />
					<div class="absolute bottom-0  bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">S</div>

					Import from file

				</button>
				<button id="loadLocalStorage" onclick={loadFromLocalStorage} class="text-white">
					<img alt="load-local" class="w-[160px]" src="icons/storage.svg" />
					<div class="absolute bottom-0  bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">D</div>

					From Local storage
				</button>
			</div>

		</div>
	</div>
{/if}
