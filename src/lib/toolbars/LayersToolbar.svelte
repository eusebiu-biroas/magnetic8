<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import { keyWatcherConfig, KeyWatcherMode, selectedShapes, shapes } from '$lib/shared.svelte.js';
	import ColorAutocomplete from '$lib/ColorAutocomplete.svelte';
	import Renamer from '$lib/toolbars/Renamer.svelte';

	let selectedId = $derived.by(() => {
		if (selectedShapes && selectedShapes.length > 0) {
			return selectedShapes[0].id;
		}
		return undefined;
	});
</script>
{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD || keyWatcherConfig.mode == KeyWatcherMode.BOOKMARKS}
	<div class="absolute right-[190px] top-3 bg-amber-300 text-black px-2  text-sm z-10 rounded-sm">F</div>
{/if}
{#if keyWatcherConfig.mode == KeyWatcherMode.STANDARD}
	<div class="absolute right-6 top-3 z-10 bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">B</div>
{/if}
{#if keyWatcherConfig.mode == KeyWatcherMode.BOOKMARKS}
	<div class="absolute right-[124px] top-[85px] z-10 bg-amber-300 text-black px-2  text-sm ml-1 rounded-sm">B</div>
{/if}
<div class="absolute top-5 right-5 border-gray-500  bg-gray-700 rounded-md border-2 max-h-[80%] overflow-y-auto">
	<div class="grid grid-cols-1 gap-2 p-2 text-white">


		<div><span class={keyWatcherConfig.mode != KeyWatcherMode.BOOKMARKS ?'font-bold text-red-9':''}>Shapes
		</span> | <span class={keyWatcherConfig.mode == KeyWatcherMode.BOOKMARKS ?'font-bold text-red-9':''}>Bookmarks

		</span></div>
		{#each selectedShapes as shape}
			<hr class="border-gray-500" />
			<div class="flex flex-col gap-1">
				<!--         <span>Name</span>-->
				<span
					class="mb-2 font-bold text-gray-400 place-items-center items-center content-center place-content-center justify-center place-self-center">
					Selection Properties
				</span>

				<!--				<span class="font-bold text-gray-400">N: <span class="text-white">{shape.name}</span></span>-->
				<div class="flex flex-row mb-2">
					<div class="mr-2"><span class="font-bold text-gray-400">N: <span
						class="text-white">{shape.name}</span></span>
					</div>
					<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-md py-1">N</div>


				</div>

				<div class="flex flex-row">
					<div class="basis-2/5"><span class="font-bold text-gray-400">X: <span
						class="text-white">{Math.round(shape.x)}</span></span>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">T</div>
					</div>
					<div class="basis-2/5"><span class="font-bold text-gray-400">Y: <span
						class="text-white">{Math.round(shape.y)}</span></span>
					</div>
				</div>

				<div class="flex flex-row">
					<div class="basis-2/5"><span class="font-bold text-gray-400">Z: <span
						class="text-white">{shape.z}</span></span>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">R</div>
					</div>
					<div class="basis-2/5"><span class="font-bold text-gray-400">R: <span
						class="text-white">{shape.r}</span></span>
					</div>
				</div>

				<div class="flex flex-row">
					<div class="basis-2/5"><span class="font-bold text-gray-400">W: <span
						class="text-white">{Math.round(shape.w)}</span></span>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">S</div>
					</div>
					<div class="basis-2/5"><span class="font-bold text-gray-400">H: <span
						class="text-white">{Math.round(shape.h)}</span></span>
					</div>
				</div>

				<div class="flex flex-row">
					<div class="basis-2/5">
						<div class="font-bold text-gray-400 flex inline-flex">C1:
							<div class="w-5 h-5 rounded border ml-1"
									 style="background-color: {shape.color1}"
							></div>
						</div>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">C</div>
					</div>
					<div class="basis-2/5">
						<div class="font-bold text-gray-400 flex inline-flex">C2:
							<div class="w-5 h-5 rounded border ml-1"
									 style="background-color: {shape.color2}"
							></div>
						</div>
					</div>
				</div>

				<div class="flex flex-row">
					<div class="basis-2/5"><span class="font-bold text-gray-400">O1: <span
						class="text-white">{shape.opacityColor1}</span></span>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">O</div>
					</div>
					<div class="basis-2/5"><span class="font-bold text-gray-400">O2: <span
						class="text-white">{shape.opacityColor2}</span></span>
					</div>
				</div>

				<div class="flex flex-row">
					<div class="basis-2/5"><span class="font-bold text-gray-400">bW: <span
						class="text-white">{shape.lineWidth}</span></span>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">B</div>
					</div>
					<div class="basis-2/5"><span class="font-bold text-gray-400">bR: <span
						class="text-white">{shape.borderRoundness}</span></span>
					</div>
				</div>
				<div class="flex flex-row">
					<div class="basis-2/5"><span class="font-bold text-gray-400">mW: <span
						class="text-white text-xs">{shape.mW}%</span></span>
					</div>
					<div class="basis-1/5">
						<div class="w-fit bg-amber-300 text-black px-2 items-center text-sm rounded-sm">B</div>
					</div>
					<div class="basis-2/5"><span class="font-bold text-gray-400">mH: <span
						class="text-white text-xs">{shape.mH}%</span></span>
					</div>
				</div>

				<div class="flex flex-row">
					<div class="basis-2/5 flex flex-row">

						{#if shape.visible}
							<img alt="visible-true" class="w-[25px]" src="icons/visible-true.svg">
						{:else}
							<img alt="visible-false" class="w-[25px]" src="icons/visible-false.svg">
						{/if}
						<div class="w-fit bg-amber-300 text-black px-2 rounded-md items-center ml-1">Q</div>

					</div>
					<div class="basis-1/5">
					</div>
					<div class="basis-2/5 flex flex-row">

						{#if !shape.locked}
							<img alt="locked-false" class="w-[25px]" src="icons/locked-false.svg">
						{:else}
							<img alt="locked-true" class="w-[25px]" src="icons/locked-true.svg">
						{/if}

						<div class="w-fit bg-amber-300 text-black px-2 rounded-md items-center ml-1">W</div>
					</div>
				</div>
				<div class="flex flex-row">
					<div class="basis-2/5 flex flex-row">

						<img alt="copy" class="w-[24px]" src="icons/copy.svg ">
						<div class="w-fit bg-amber-300 text-black px-2 rounded-md items-center ml-1">Y</div>

					</div>
					<div class="basis-1/5">
					</div>
					<div class="basis-2/5 flex flex-row">

						<img alt="paste" class="w-[24px]" src="icons/paste.svg ">
						<div class="w-fit bg-amber-300 text-black px-2 rounded-md items-center ml-1">P</div>

					</div>
				</div>
				<div class="flex flex-row">
					<div class=" flex flex-row">

						<img class="w-[24px]" alt="magnet" src="icons/magnet.svg">
						<div class="w-fit bg-amber-300 text-black px-2 rounded-md items-center ml-1">SHIFT + M</div>

					</div>


				</div>

				<ColorAutocomplete />
				<Renamer />
			</div>
			<hr class="border-gray-500" />
		{/each}

		{#if keyWatcherConfig.mode != KeyWatcherMode.BOOKMARKS}
			<!-- Tree Root -->
			<div class="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
				<!-- 1st Level Accordion Group -->
				<div class="hs-accordion-group" role="group" data-hs-accordion-always-open="">

					{#each [...shapes.filter(item => item.magnetizedParents.length == 0 && item.type != 'bookmark')].reverse() as shape}

						<!-- 1st Level Accordion -->
						<div class="hs-accordion" role="treeitem" aria-expanded="false"
								 id="hs-basic-usage-example-tree-heading-three">
							<!-- 1st Level Accordion Heading -->
							<div class="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
								{#if shape.magnetizedChildren.length > 0}

									<button
										class="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
										aria-expanded="false" aria-controls="hs-basic-usage-example-tree-collapse-three">
										<!--							<svg class="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">-->
										<!--								<path d="M5 12h14"></path>-->
										<!--								<path class="hs-accordion-active:hidden block" d="M12 5v14"></path>-->
										<!--							</svg>-->

										{#if shape.locked}
											<img alt="visible-true" class="w-[20px]" src="icons/magnet-locked.svg">
										{:else}
											<img alt="visible-false" class="w-[20px]" src="icons/magnet.svg">
										{/if}
									</button>
								{/if}


								<div
									class="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
									<div class="flex items-center gap-x-1">
										<!--								<svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">-->
										<!--									<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>-->
										<!--								</svg>-->
										{#if shape.visible}
											<img alt="visible-true" class="w-[20px]" src="icons/visible-true.svg">
										{:else}
											<img alt="visible-false" class="w-[20px]" src="icons/visible-false.svg">
										{/if}
										{#if [KeyWatcherMode.FIND, KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE, KeyWatcherMode.SELECTION_MAGNET_BOTTOM,
											KeyWatcherMode.SELECTION_MAGNET_TOP, KeyWatcherMode.SELECTION_MAGNET_RIGHT, KeyWatcherMode.SELECTION_MAGNET_LEFT].includes(keyWatcherConfig.mode) }
											<div
												class="bg-amber-300 text-black px-2 rounded-md items-center"> {shape.hint.toUpperCase()} </div>
										{/if}
										<div class="grow">
              <span
								class="{shape.id == selectedId? 'text-blue-400 font-bold' : 'text-sm text-neutral-200'}">
                {shape.name} {shape.text ? ': ' + shape.text.replace(' ', '').substring(0, 5) : ''}
              </span>
										</div>
										{#if !shape.locked}
											<img alt="locked-false" class="w-[20px]" src="icons/locked-false.svg">
										{:else}
											<img alt="locked-true" class="w-[20px]" src="icons/locked-true.svg">
										{/if}
									</div>
								</div>
							</div>
							<!-- End 1st Level Accordion Heading -->

							{#if !shape.locked}
								{#each shape.magnetizedChildren as shapeChildren}
									<!-- 1st Level Collapse -->
									<div id="hs-basic-usage-example-tree-collapse-three"
											 class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group"
											 aria-labelledby="hs-basic-usage-example-tree-heading-three">

										<div
											class="ms-5 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
											<!-- 1st Level Item -->

											<div
												class="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer"
												role="treeitem">
												<div class="flex items-center gap-x-1">
													{#if shapeChildren.magnetizedChildren.length > 0}

														<button
															class="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
															aria-expanded="false" aria-controls="hs-basic-usage-example-tree-collapse-three">
															<!--							<svg class="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">-->
															<!--								<path d="M5 12h14"></path>-->
															<!--								<path class="hs-accordion-active:hidden block" d="M12 5v14"></path>-->
															<!--							</svg>-->

															<img alt="magnet" class="w-[18px]" src="icons/magnet.svg">

														</button>
													{/if}
													{#if shapeChildren.visible}
														<img alt="visible-true" class="w-[18px]" src="icons/visible-true.svg">
													{:else}
														<img alt="visible-false" class="w-[18px]" src="icons/visible-false.svg">
													{/if}
													{#if keyWatcherConfig.mode === KeyWatcherMode.FIND}
														<div
															class="bg-amber-300 text-black px-2 rounded-md items-center"> {shapeChildren.hint.toUpperCase()} </div>
													{/if}
													<div class="grow">
                <span
									class="{shapeChildren.id == selectedId? 'text-blue-400 font-bold' : 'text-sm text-gray-800 dark:text-neutral-200'}">
                  {shapeChildren.name}
                </span>

													</div>
													{#if !shapeChildren.locked}
														<img alt="locked-false" class="w-[18px]" src="icons/locked-false.svg">
													{:else}
														<img alt="locked-true" class="w-[18px]" src="icons/locked-true.svg">
													{/if}
												</div>
											</div>
											<!-- End 1st Level Item -->
										</div>
									</div>
									<!-- End 1st Level Collapse -->

									{#each shapeChildren.magnetizedChildren as shapeChildren}
										<!-- 1st Level Collapse -->
										<div id="hs-basic-usage-example-tree-collapse-three"
												 class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
												 role="group"
												 aria-labelledby="hs-basic-usage-example-tree-heading-three">
											<div
												class="ms-7 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
												<!-- 1st Level Item -->
												<div
													class="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer"
													role="treeitem">
													<div class="flex items-center gap-x-1">
														{#if shapeChildren.visible}
															<img alt="visible-true" class="w-[20px]" src="icons/visible-true.svg">
														{:else}
															<img alt="visible-false" class="w-[20px]" src="icons/visible-false.svg">
														{/if}
														{#if keyWatcherConfig.mode === KeyWatcherMode.FIND}
															<div
																class="bg-amber-300 text-black px-2 rounded-md items-center"> {shapeChildren.hint.toUpperCase()} </div>
														{/if}
														<div class="grow">
                <span
									class="{shapeChildren.id == selectedId? 'text-blue-400 font-bold' : 'text-sm text-neutral-200'}">
                  {shapeChildren.name}
                </span>

														</div>
														{#if !shapeChildren.locked}
															<img alt="locked-false" class="w-[20px]" src="icons/locked-false.svg">
														{:else}
															<img alt="locked-true" class="w-[20px]" src="icons/locked-true.svg">
														{/if}
													</div>
												</div>
												<!-- End 1st Level Item -->
											</div>
										</div>
										<!-- End 1st Level Collapse -->
									{/each}
								{/each}
							{/if}
						</div>
					{/each}

					<!-- End 1st Level Accordion -->
				</div>
				<!-- End 1st Level Accordion Group -->
			</div>

			<!-- End Tree Root -->
		{/if}
		{#if keyWatcherConfig.mode == KeyWatcherMode.BOOKMARKS}
			<img src="icons/bookmark.svg" />
			<!-- Tree Root -->
			<div class="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
				<!-- 1st Level Accordion Group -->
				<div class="hs-accordion-group" role="group" data-hs-accordion-always-open="">

					{#each [...shapes.filter(item => item.type == 'bookmark')].reverse() as shape}

						<!-- 1st Level Accordion -->
						<div class="hs-accordion" role="treeitem" aria-expanded="false"
								 id="hs-basic-usage-example-tree-heading-three">
							<!-- 1st Level Accordion Heading -->
							<div class="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
								{#if shape.magnetizedChildren.length > 0}

									<button
										class="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
										aria-expanded="false" aria-controls="hs-basic-usage-example-tree-collapse-three">
										<!--							<svg class="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">-->
										<!--								<path d="M5 12h14"></path>-->
										<!--								<path class="hs-accordion-active:hidden block" d="M12 5v14"></path>-->
										<!--							</svg>-->

										<img alt="magnet" class="w-[21px]" src="icons/magnet.svg">

									</button>
								{/if}


								<div
									class="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
									<div class="flex items-center gap-x-1">
										<!--								<svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">-->
										<!--									<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>-->
										<!--								</svg>-->
										<!--{#if shape.visible}-->
										<!--	<img alt="visible-true" class="w-[20px]" src="icons/visible-true.svg">-->
										<!--{:else}-->
										<!--	<img alt="visible-false" class="w-[20px]" src="icons/visible-false.svg">-->
										<!--{/if}-->
										<div
											class="bg-amber-300 text-black px-2 rounded-md items-center"> {shape.hint.toUpperCase()} </div>
										<div class="grow">
              <span
								class="{shape.id == selectedId? 'text-blue-400 font-bold' : 'text-sm text-neutral-200'}">
                {shape.name} {shape.text ? ': ' + shape.text.replace(' ', '').substring(0, 5) : ''}
              </span>
										</div>

									</div>
								</div>
							</div>
							<!-- End 1st Level Accordion Heading -->

						</div>
					{/each}

					<!-- End 1st Level Accordion -->
				</div>
				<!-- End 1st Level Accordion Group -->
			</div>

			<!-- End Tree Root -->
		{/if}
	</div>


</div>