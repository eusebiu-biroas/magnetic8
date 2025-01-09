<script lang="ts">
	import { canvasStatus, keyWatcherConfig, KeyWatcherMode, multiplier } from '$lib/shared.svelte';

	let status = $derived.by(() => {
			let status = '';
			if ([KeyWatcherMode.STANDARD].includes(keyWatcherConfig.mode)) {
				status += ` ${multiplier.STANDARD_TRANSLATION} x `;
			} else if ([KeyWatcherMode.SELECTION_TRANSLATION].includes(keyWatcherConfig.mode)) {
				status += multiplier.SELECTION_TRANSLATION + ' x ';
			} else if ([KeyWatcherMode.SELECTION_SCALE].includes(keyWatcherConfig.mode)) {
				status += multiplier.SELECTION_SCALING + ' x ';
			} else if ([KeyWatcherMode.SELECTION_ROTATE].includes(keyWatcherConfig.mode)) {
				status += multiplier.SELECTION_ROTATION + ' x ';
			}
			status += keyWatcherConfig.mode;

			if (keyWatcherConfig.mode == KeyWatcherMode.FIND) {
				status += `: ${canvasStatus.hintSearched.toUpperCase()}`;
			}

			return status;

		}
	);
</script>
<div
	class="absolute top-[73px] opacity-90 right-0 left-0 w-fit mx-auto px-4 py-2  rounded-md  bg-gray-700 text-amber-300 text-xs border-gray-500 border-1">
	{status}
</div>