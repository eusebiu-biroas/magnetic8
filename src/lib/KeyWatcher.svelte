<script lang="ts">
	import { getContext } from 'svelte';
	import type CanvasContext from '$lib/types/CanvasContext';
	import {
		camera,
		canvasStatus,
		clipboard,
		keyWatcherConfig,
		KeyWatcherMode,
		multiplier,
		selectedShapes,
		shapes
	} from '$lib/shared.svelte';
	import type Shape from '$lib/types/Shape';
	import KeyWatcherStatus from '$lib/KeyWatcherStatus.svelte';
	import { KeyCode } from '$lib/constants/keycode';
	import { shapesDefinition } from '$lib/constants/shapesDefinition';

	let canvasContext: CanvasContext = getContext('canvas');
	let MULTIPLIER_MODE: boolean = false;
	console.log(canvasContext);

	function createHints(exclude: string, includeMagnetizedChildren: boolean) {
		// Create hints using letters, excluding similar looking characters
		const chars = 'asdfghjklqwertyuiopzxcvbnm';
		if (exclude) {
			chars.replace(exclude, '');
		}

		shapes.forEach(item => item.hint = '');

		let shapesForHints = shapes.filter(item => item.magnetizedParents.length == 0 || includeMagnetizedChildren);

		// Calculate how many characters we need per hint to accommodate all shapes
		const hintLength = Math.ceil(Math.log(shapesForHints.length) / Math.log(chars.length));


		// Generate fixed-length hints for all elements
		for (let i = 0; i < shapesForHints.length; i++) {
			let hint = '';
			let num = i;

			// Always generate hints of the same length by padding with first character
			for (let j = 0; j < hintLength; j++) {
				hint = chars[num % chars.length] + hint;
				num = Math.floor(num / chars.length);
			}

			shapesForHints[i].hint = hint || 'a';
			selectedShapes.forEach(item => item.hint = '-');
		}
	}

	// canvasContext.addRectangle();
	function onKeyDown(e: KeyboardEvent) {
		console.log(e.key, e.keyCode);
		if (keyWatcherConfig.mode != KeyWatcherMode.SELECTION_EDIT && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
			if (MULTIPLIER_MODE) {
				if ([KeyWatcherMode.STANDARD].includes(keyWatcherConfig.mode)) {
					multiplier.STANDARD_TRANSLATION = +(multiplier.STANDARD_TRANSLATION + e.key);
				}
				if ([KeyWatcherMode.SELECTION_TRANSLATION].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_TRANSLATION = +(multiplier.SELECTION_TRANSLATION + e.key);
				}
				if ([KeyWatcherMode.SELECTION_SCALE].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_SCALING = +(multiplier.SELECTION_SCALING + e.key);
				}
				if ([KeyWatcherMode.SELECTION_ROTATE].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_ROTATION = +(multiplier.SELECTION_ROTATION + e.key);
				}
			} else {
				if ([KeyWatcherMode.STANDARD].includes(keyWatcherConfig.mode)) {
					multiplier.STANDARD_TRANSLATION = +e.key;
				}
				if ([KeyWatcherMode.SELECTION_TRANSLATION].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_TRANSLATION = +e.key;
				}
				if ([KeyWatcherMode.SELECTION_SCALE].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_SCALING = +e.key;
				}
				if ([KeyWatcherMode.SELECTION_SCALE].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_SCALING = +e.key;
				}
				if ([KeyWatcherMode.SELECTION_ROTATE].includes(keyWatcherConfig.mode)) {
					multiplier.SELECTION_ROTATION = +e.key;
				}
			}
			MULTIPLIER_MODE = true;
			return true;
		}
		MULTIPLIER_MODE = false;

		switch (e.keyCode) {
			case KeyCode.Escape:
				if (keyWatcherConfig.mode == KeyWatcherMode.LOAD_PROGRESS) {
					document.getElementById('closeLoader')?.click();
				}
				if (keyWatcherConfig.mode == KeyWatcherMode.SAVE_PROGRESS) {
					document.getElementById('closeSaver')?.click();
				}
				if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_EDIT) {
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
				} else {
					keyWatcherConfig.mode = KeyWatcherMode.STANDARD;
					selectedShapes.length = 0;
					canvasStatus.hintSearched = '';
				}


				e.preventDefault();
				break;
			case KeyCode.Space:
				if ([KeyWatcherMode.SELECTION_EDIT, KeyWatcherMode.SELECTION_COLOR_1, KeyWatcherMode.SELECTION_COLOR_2].includes(keyWatcherConfig.mode)) {
					break;
				}

				let selectionEligible = e.altKey ? shapes : shapes.filter(item => item.magnetizedParents.length == 0);


				if (!e.shiftKey) {
					if (selectedShapes.length == 0) {
						selectedShapes.push(selectionEligible[selectionEligible.length - 1]);
						keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

					} else {
						let index = selectionEligible.indexOf(selectedShapes[0]);
						if (index == 0) {
							index = selectionEligible.length;
						}
						selectedShapes.length = 0;
						selectedShapes.push(selectionEligible[index - 1]);
					}

				} else {
					if (selectedShapes.length == 0) {
						selectedShapes.push(selectionEligible[0]);
						keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

					} else {
						let index = selectionEligible.indexOf(selectedShapes[0]);
						if (index == selectionEligible.length - 1) {
							index = -1;
						}
						selectedShapes.length = 0;
						selectedShapes.push(selectionEligible[index + 1]);
					}
				}
				break;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_COLOR_1 || keyWatcherConfig.mode == KeyWatcherMode.SELECTION_COLOR_2) {
			return;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.SAVE_PROGRESS) {
			switch (e.keyCode) {
				case KeyCode.A:
					document.getElementById('saveImage')?.click();
					break;
				case KeyCode.S:
					document.getElementById('saveJson')?.click();
					break;
				case KeyCode.D:
					document.getElementById('saveLocalStorage')?.click();
					break;
				case KeyCode.Escape:
					document.getElementById('closeSaver')?.click();
					break;
			}
			return;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.LOAD_PROGRESS) {
			switch (e.keyCode) {
				case KeyCode.A:
					document.getElementById('loadJson')?.click();
					break;
				case KeyCode.S:
					document.getElementById('importJson')?.click();
					break;
				case KeyCode.D:
					document.getElementById('loadLocalStorage')?.click();
					break;
				case KeyCode.Escape:
					document.getElementById('closeLoader')?.click();
					break;
			}
			return;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNET_RIGHT
			|| keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNET_LEFT
			|| keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNET_TOP
			|| keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNET_BOTTOM) {

			canvasStatus.hintSearched += e.key;
			let find = shapes.find(item => item.hint == canvasStatus.hintSearched);
			if (find) {
				const selectedShape = selectedShapes[0];
				selectedShape.magnetize(find, multiplier.SELECTION_TRANSLATION, keyWatcherConfig.mode);
				keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET;
			}
			return;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE) {
			if (e.shiftKey && e.keyCode == KeyCode.A) {
				shapes.forEach(item => selectedShapes[0].magnetize(item, 0, keyWatcherConfig.mode));
			}
			canvasStatus.hintSearched += e.key;
			let find = shapes.find(item => item.hint == canvasStatus.hintSearched);
			if (find) {
				const selectedShape = selectedShapes[0];
				selectedShape.magnetize(find, multiplier.SELECTION_TRANSLATION, keyWatcherConfig.mode);
				canvasStatus.hintSearched = '';
			}
			return;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_EDIT) {
			selectedShapes.forEach((item: Shape) => {
				let ignoreKeys = [16, 17, 38, 40];
				if (ignoreKeys.includes(e.keyCode)) {
					return;
				}
				if (e.keyCode == KeyCode.LeftArrow) {
					item.caretPosition--;
					if (item.caretPosition < 0) {
						item.caretPosition = 0;
					}
					canvasContext.draw();
					return;
				}
				if (e.keyCode == KeyCode.RightArrow) {
					item.caretPosition++;
					if (item.caretPosition > item.text.length) {
						item.caretPosition = item.text.length;
					}
					canvasContext.draw();
					return;
				}
				if (e.keyCode == KeyCode.Enter) {
					item.text += '\n';
					item.caretPosition++;
				} else if (e.keyCode == KeyCode.Backspace && item.text.length > 0) {
					item.text = item.text.substring(0, item.caretPosition - 1) + item.text.substring(item.caretPosition, item.text.length);
					item.caretPosition--;
				} else if (e.keyCode != KeyCode.Backspace) {
					// item.text = item.text.substring(0, item.caretPosition - 1) + item.text.substring(item.caretPosition, item.text.length);
					item.text = item.text.substring(0, item.caretPosition) + e.key + item.text.substring(item.caretPosition, item.text.length);

					// item.text += e.key;
					item.caretPosition++;
				}
				canvasContext.draw();
			});
			return;
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.INSERT) {
			const shapeDefinition = shapesDefinition.find(item => item.hint == e.key);
			if (shapeDefinition) {
				canvasContext.addShape(shapeDefinition.type);
				return;
			}
			// switch (e.keyCode) {
			// 	case 65:
			// 		canvasContext.addRectangle();
			// 		break;
			// 	case 70:
			// 		canvasContext.addText();
			// 		return;
			//
			// }
		} else if (keyWatcherConfig.mode == KeyWatcherMode.FIND) {
			canvasStatus.hintSearched += e.key;
			let find = shapes.find(item => item.hint == canvasStatus.hintSearched);
			if (find) {
				selectedShapes.length = 0;
				selectedShapes.push(find);
				keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
				canvasStatus.hintSearched = '';
			}
			return;
		} else if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_TRANSLATION) {
			switch (e.keyCode) {
				case KeyCode.D:
					selectedShapes.forEach(item => {
						let indexOf = shapes.indexOf(item);
						item.magnetizedParents.forEach(parent => {
							let indexOfChild = parent.magnetizedChildren.indexOf(item);
							if (indexOfChild > -1) {
								parent.magnetizedChildren.splice(indexOfChild, 1);
							}
						});

						shapes.splice(indexOf, 1);
					});
					selectedShapes.length = 0;
					break;
				case KeyCode.E:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_EDIT;
					selectedShapes.forEach(item => item.caretPosition = item.text.length);
					break;
				case 74:
					selectedShapes.forEach(item => {
						item.translate(0, multiplier.SELECTION_TRANSLATION);
					});
					break;
				case 75:
					selectedShapes.forEach(item => {
						item.translate(0, -multiplier.SELECTION_TRANSLATION);
					});
					break;
				case 72:
					selectedShapes.forEach(item => {
						item.translate(-multiplier.SELECTION_TRANSLATION, 0);
					});
					break;
				case 76:
					selectedShapes.forEach(item => {
						item.translate(multiplier.SELECTION_TRANSLATION, 0);
					});
					break;
				case 77:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET;
					break;
				case KeyCode.P:
					clipboard.forEach(item => {
						const clone = item.clone();
						let multiplierX = 0;
						if (e.altKey) {
							multiplierX = multiplier.SELECTION_TRANSLATION;
						}
						if (!e.shiftKey) {

							if (clone.magnetizedChildren.length == 0) {
								clone.x = selectedShapes[0].x + selectedShapes[0].w + multiplierX;
								clone.y = selectedShapes[0].y;
							} else {
								clone.translate(selectedShapes[0].x + selectedShapes[0].w - item.x, 0);
							}
						} else {
							clone.x = selectedShapes[0].x;
							clone.y = selectedShapes[0].y + selectedShapes[0].h + multiplierX;
						}
						// shapes.push(clone);
						selectedShapes.length = 0;
						selectedShapes.push(clone);
					});
					break;
				case KeyCode.R:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_ROTATE;
					break;
				case KeyCode.S:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_SCALE;
					break;
				case KeyCode.Y:
					clipboard.length = 0;
					clipboard.push(...selectedShapes);
					break;
				case KeyCode.B:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS;
					break;
				case KeyCode.O:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_OPACITY;
					break;
			}
			canvasContext.draw();
		} else if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS) {
			switch (e.keyCode) {
				case 68:
					selectedShapes.forEach(item => {
						let indexOf = shapes.indexOf(item);
						shapes.splice(indexOf, 1);
					});
					selectedShapes.length = 0;
					break;
				case 69:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_EDIT;
					break;
				case KeyCode.J:
					selectedShapes.forEach(item => {
						item.adjustBorderWidth(-1, e.shiftKey);
					});
					break;
				case KeyCode.K:
					selectedShapes.forEach(item => {
						item.adjustBorderWidth(1, e.shiftKey);
					});
					break;
				case KeyCode.H:
					selectedShapes.forEach(item => {
						item.adjustBorderRoundness(-1, e.shiftKey);
					});
					break;
				case KeyCode.L:
					selectedShapes.forEach(item => {
						item.adjustBorderRoundness(1, e.shiftKey);
					});
					break;
				case 77:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET;
					break;
				case 80:
					console.log(e);
					clipboard.forEach(item => {
						const clone = item.clone();
						if (!e.shiftKey) {
							clone.x = selectedShapes[0].x + selectedShapes[0].w + multiplier.SELECTION_TRANSLATION;
							clone.y = selectedShapes[0].y;
						} else {
							clone.x = selectedShapes[0].x;
							clone.y = selectedShapes[0].y + selectedShapes[0].h + multiplier.SELECTION_TRANSLATION;
						}
						// shapes.push(clone);
						selectedShapes.length = 0;
						selectedShapes.push(clone);
					});
					break;
				case KeyCode.R:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_ROTATE;
					break;
				case KeyCode.S:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_SCALE;
					break;
				case KeyCode.Y:
					clipboard.length = 0;
					clipboard.push(...selectedShapes);
					break;
				case KeyCode.B:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS;
					break;
				case KeyCode.O:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_OPACITY;
					break;
			}
			canvasContext.draw();
		} else if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_OPACITY) {
			switch (e.keyCode) {
				case 68:
					selectedShapes.forEach(item => {
						let indexOf = shapes.indexOf(item);
						shapes.splice(indexOf, 1);
					});
					selectedShapes.length = 0;
					break;
				case 69:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_EDIT;
					break;
				case KeyCode.J:
					selectedShapes.forEach(item => {
						item.adjustColor2Opacity(-10, e.shiftKey);
					});
					break;
				case KeyCode.K:
					selectedShapes.forEach(item => {
						item.adjustColor2Opacity(10, e.shiftKey);
					});
					break;
				case KeyCode.H:
					selectedShapes.forEach(item => {
						item.adjustColor1Opacity(-10, e.shiftKey);
					});
					break;
				case KeyCode.L:
					selectedShapes.forEach(item => {
						item.adjustColor1Opacity(10, e.shiftKey);
					});
					break;
				case 77:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET;
					break;
				case KeyCode.P:
					console.log(e);
					clipboard.forEach(item => {
						const clone = item.clone();
						if (selectedShapes.length === 0) {
							clone.x = camera.x + 100;
							clone.y = camera.y + 100;
						} else if (!e.shiftKey) {
							// clone.x = selectedShapes[0].x + selectedShapes[0].w + multiplier.SELECTION_TRANSLATION;
							// clone.y = selectedShapes[0].y;
						} else {
							// clone.x = selectedShapes[0].x;
							// clone.y = selectedShapes[0].y + selectedShapes[0].h + multiplier.SELECTION_TRANSLATION;
						}
						// shapes.push(clone);
						selectedShapes.length = 0;
						selectedShapes.push(clone);
					});
					break;
				case KeyCode.R:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_ROTATE;
					break;
				case KeyCode.S:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_SCALE;
					break;
				case KeyCode.Y:
					clipboard.length = 0;
					clipboard.push(...selectedShapes);
					break;
				case KeyCode.B:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS;
					break;
				case KeyCode.O:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_OPACITY;
					break;
			}
			canvasContext.draw();
		} else if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_SCALE) {
			switch (e.keyCode) {
				case 74:
					selectedShapes.forEach(item => {
						item.scale(0, multiplier.SELECTION_SCALING);
					});
					break;
				case 75:
					selectedShapes.forEach(item => {
						item.scale(0, -multiplier.SELECTION_SCALING);
					});
					break;
				case 72:
					selectedShapes.forEach(item => {
						item.scale(-multiplier.SELECTION_SCALING, 0);
					});
					break;
				case 76:
					selectedShapes.forEach(item => {
						item.scale(multiplier.SELECTION_SCALING, 0);
					});
					break;
				case 84:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
					break;
				case 82:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_ROTATE;
					break;
			}
			canvasContext.draw();
		} else if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_ROTATE) {
			switch (e.keyCode) {
				case 74:
					selectedShapes[0].rotate(multiplier.SELECTION_ROTATION);
					break;
				case 75:
					selectedShapes[0].rotate(-multiplier.SELECTION_ROTATION);
					break;
				case 72:
					selectedShapes[0].rotate(-multiplier.SELECTION_ROTATION);
					break;
				case 76:
					selectedShapes[0].rotate(multiplier.SELECTION_ROTATION);
					break;
				case 84:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
					break;
				case 83:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_SCALE;
					break;
			}
			canvasContext.draw();
		} else if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNET) {
			switch (e.keyCode) {
				case KeyCode.J:
					createHints('i', e.shiftKey);
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET_BOTTOM;
					break;
				case KeyCode.K:
					createHints('i', e.shiftKey);
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET_TOP;
					break;
				case KeyCode.H:
					createHints('i', e.shiftKey);
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET_LEFT;
					break;
				case KeyCode.L:
					createHints('i', e.shiftKey);
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET_RIGHT;
					break;
				case KeyCode.T:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
					break;
				case KeyCode.S:
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_SCALE;
					break;
				case KeyCode.M:
					createHints('', e.shiftKey);
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE;
					break;
				case KeyCode.P:
					clipboard.forEach(item => {
						const clone = item.clone();
						let multiplierX = 0;
						if (e.altKey) {
							multiplierX = multiplier.SELECTION_TRANSLATION;
						}
						if (!e.shiftKey) {
							clone.x = selectedShapes[0].x + selectedShapes[0].w + multiplierX;
							clone.y = selectedShapes[0].y;
						} else {
							clone.x = selectedShapes[0].x;
							clone.y = selectedShapes[0].y + selectedShapes[0].h + multiplierX;
						}
						// shapes.push(clone);
						selectedShapes[0].magnetize(clone, 0, KeyWatcherMode.SELECTION_MAGNET_RIGHT);
						selectedShapes.length = 0;
						selectedShapes.push(clone);
					});
					break;
			}
			canvasContext.draw();
		}

		if (keyWatcherConfig.mode == KeyWatcherMode.STANDARD) {
			switch (e.keyCode) {
				case 74:
					camera.y += multiplier.STANDARD_TRANSLATION;
					if (camera.y + canvasStatus.height > canvasStatus.yMax) {
						canvasStatus.yMax = camera.y + canvasStatus.height;
					}
					break;
				case 75:
					camera.y -= multiplier.STANDARD_TRANSLATION;
					if (camera.y < canvasStatus.yMin) {
						canvasStatus.yMin = camera.y;
					}
					break;
				case 72:
					camera.x -= multiplier.STANDARD_TRANSLATION;
					if (camera.x < 0) {
						if (camera.x < canvasStatus.xMin) {
							canvasStatus.xMin = camera.x;
						}
					}
					break;
				case 76:
					camera.x += multiplier.STANDARD_TRANSLATION;
					if (camera.x + canvasStatus.width > canvasStatus.xMax) {
						canvasStatus.xMax = camera.x + canvasStatus.width;
					}
					break;
				case 77:
					camera.z += 0.0030 * multiplier.STANDARD_TRANSLATION;
					if (camera.z > canvasStatus.zMax) {
						canvasStatus.zMax = camera.z;
					}
					break;
				case 78:
					camera.z -= 0.0030 * multiplier.STANDARD_TRANSLATION;
					if (camera.z < canvasStatus.zMin) {
						canvasStatus.zMin = camera.z;
					}
					break;
				case 82:
					camera.x = 0;
					camera.y = 0;
					camera.z = 1;
					break;
				case KeyCode.S:
					if (e.shiftKey) {
					} else {
						keyWatcherConfig.mode = KeyWatcherMode.SAVE_PROGRESS;
						document.getElementById('saver')?.click();
					}
					break;
				case KeyCode.O:
					if (e.shiftKey) {
					} else {
						keyWatcherConfig.mode = KeyWatcherMode.LOAD_PROGRESS;
						document.getElementById('loader')?.click();
					}
					break;
			}
			canvasContext.draw();
		}

		// else {
		switch (e.keyCode) {
			case KeyCode.C:
				if (!e.shiftKey) {
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_COLOR_1;
				} else {
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_COLOR_2;
				}
				document.getElementById('colorPicker').click();
				// document.getElementById('color1').select();
				e.preventDefault();
				break;
			case 73:
				keyWatcherConfig.mode = KeyWatcherMode.INSERT;
				break;
			case 70:
				createHints('', e.shiftKey);
				keyWatcherConfig.mode = KeyWatcherMode.FIND;
				break;
			case KeyCode.O:
				if (keyWatcherConfig.mode == KeyWatcherMode.STANDARD) {
					canvasContext.loadProgress();
				}
				break;
			case KeyCode.N:
				if (keyWatcherConfig.mode != KeyWatcherMode.STANDARD) {
					keyWatcherConfig.mode = KeyWatcherMode.SELECTION_COLOR_1;
					document.getElementById('renamer')?.click();
				}
				break;
			case KeyCode.B:
				if (keyWatcherConfig.mode == KeyWatcherMode.STANDARD) {
					keyWatcherConfig.mode = KeyWatcherMode.BOOKMARKS;
				}
				break;
			case KeyCode.Equal:
				if (e.shiftKey) {
					document.getElementById('newCanvas')?.click();
				}
				break;
			case KeyCode.UpArrow:
				if (e.shiftKey) {
					if (selectedShapes.length == 1) {
						let indexOf = shapes.indexOf(selectedShapes[0]);

						shapes.splice(indexOf, 1);
						shapes.splice(indexOf + 1, 0, selectedShapes[0]);
					}
				}
				break;
			case KeyCode.DownArrow:
				if (e.shiftKey) {
					let indexOf = shapes.indexOf(selectedShapes[0]);

					if (indexOf == shapes.length - 1) {
						indexOf = 0;
					}
					shapes.splice(indexOf, 1);
					shapes.splice(indexOf - 1, 0, selectedShapes[0]);
				}
				break;

		}
		// }
	}
</script>
<main>
	<KeyWatcherStatus></KeyWatcherStatus>
</main>
<svelte:window on:keydown={onKeyDown} />
