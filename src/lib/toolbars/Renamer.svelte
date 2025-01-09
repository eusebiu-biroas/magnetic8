<script lang="ts">
	import {  onMount } from 'svelte';
	import { keyWatcherConfig, KeyWatcherMode, selectedShapes } from '$lib/shared.svelte';



	let inputValue = $state('');
	let showSuggestions = $state(false);
	let isOpen = $state(false);
	let inputRef;

	function openModal() {
		isOpen = true;
		setTimeout(() => inputRef?.focus(), 50);
	}

	function closeModal() {
		isOpen = false;
		inputValue = '';
		showSuggestions = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && !showSuggestions) {
			closeModal();
			return;
		}

		switch (event.key) {
			case 'Enter':
		    selectedShapes[0].name = inputValue+'_'+selectedShapes[0].id;
				keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

				closeModal();
				break;
			case 'Escape':
				showSuggestions = false;
				break;
		}
	}

	function handleInput(event) {
		inputValue = event.target.value;
		showSuggestions = true;
	}

</script>

<!-- Trigger button -->
<button id="renamer"
				onclick={openModal}
				class="hidden px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
	Choose a Color
</button>

<!-- Modal overlay -->
{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
		<div
			class="relative w-full max-w-xl p-8"
		>
			<!-- Close button -->
			<button
				onclick={closeModal}
				class="absolute right-10 top-0 text-white hover:text-gray-300"
			>
				✕
			</button>

			<input
				bind:this={inputRef}
				type="text"
				value={inputValue}
				oninput={handleInput}
				onkeydown={handleKeydown}
				placeholder="Type a name..."
				class="text-black w-full px-6 py-4 text-lg bg-white border-2 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>

		</div>
	</div>
{/if}