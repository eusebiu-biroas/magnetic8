<script lang="ts">
	import { onMount, setContext, tick } from 'svelte';
	import { camera, canvasStatus, keyWatcherConfig, KeyWatcherMode, selectedShapes, shapes } from '$lib/shared.svelte';
	import KeyWatcher from '$lib/KeyWatcher.svelte';
	import CameraControls from '$lib/CameraControls.svelte';
	import GridOld1 from '$lib/shapes/grid.old1';
	import { Text } from '$lib/shapes/Text.svelte';
	import { Rectangle } from '$lib/shapes/Rectangle.svelte';
	import { Check } from '$lib/shapes/Check.svelte.js';
	import { Line } from '$lib/shapes/Line.svelte';
	import type Shape from '$lib/types/Shape';
	import type Camera from '$lib/types/Camera';
	import type ShapeSave from '$lib/types/ShapeSave';
	import { Triangle } from '$lib/shapes/Triangle.svelte';
	import ShapesToolbar from '$lib/toolbars/ShapesToolbar.svelte';

	setContext('canvas', { addRectangle, addText, addShape, draw, saveProgress, loadProgress, saveCanvasToImage });

	let canvas: HTMLCanvasElement;
	let width = $state(0);
	let height = $state(0);

	function loadShape(shape: ShapeSave) {
		let newShape: Shape | undefined = undefined;
		if (shape.type == 'rectangle') {
			newShape = new Rectangle(shape.x, shape.y, shape.z, shape.w, shape.h);
		}
		if (shape.type == 'text') {
			newShape = new Text(shape.text, shape.fontSize, shape.x, shape.y, shape.z, shape.w, shape.h);
		}

		if (shape.type == 'line') {
			newShape = new Line(shape.x, shape.y, shape.z, shape.w, shape.h);
			newShape.isArrow = shape.isArrow;
			newShape.isDotted = shape.isDotted;
		}
		if (shape.type == 'circle') {
			newShape = new Rectangle(shape.x, shape.y, shape.z, shape.w, shape.h);
		}
		if (shape.type == 'triangle') {
			newShape = new Triangle(shape.x, shape.y, shape.z, shape.w, shape.h);
		}
		if (shape.type == 'check') {
			newShape = new Check(shape.x, shape.y, shape.z, shape.w, shape.h);
		}

		if (newShape) {
			newShape.r = shape.r;
			newShape.borderRoundness = shape.borderRoundness;
			newShape.color1 = shape.color1;
			newShape.color2 = shape.color2;
			newShape.opacityColor1 = shape.opacityColor1;
			newShape.opacityColor2 = shape.opacityColor2;
			newShape.mW = shape.mW;
			newShape.mH = shape.mH;
			newShape.mR = shape.mR;
			newShape.lineWidth = shape.lineWidth;
			newShape.importId = shape.id;
			newShape.name = shape.name + '_' + shape.id;
			shapes.push(newShape);
			return newShape;
		}
	}

	function loadProgress(json: string, add: boolean) {

		let item = json || localStorage.getItem('shapes');

		if (item) {
			if (!add) {
				shapes.length = 0;
				selectedShapes.length = 0;
			} else {
				shapes.forEach(item => item.importId = 0);
			}
			const shapesLoaded: ShapeSave[] = JSON.parse(item);

			shapesLoaded.forEach((shapeLoaded: ShapeSave) => {
				const newShape = loadShape(shapeLoaded);
			});

			shapesLoaded.filter(item => item.magnetizedChildrenIds.length > 0).forEach((shapeLoaded: ShapeSave) => {
				shapeLoaded.magnetizedChildrenIds.forEach(id => {
					let child = shapes.find(item => item.importId === id);
					if (child) {
						let parent = shapes.find(item => item.importId === shapeLoaded.id);
						if (parent) {
							parent.magnetize(child, 0, KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE);
						}
					}
				});
			});
			// let children: number[] = [];
			// let parents = shapesLoaded.filter(item => item.magnetizedChildrenIds.length > 0);
			// parents.forEach(item => children.push(...item.magnetizedChildrenIds));
			// let individuals = shapesLoaded.filter(item => item.magnetizedChildrenIds.length == 0 && !children.includes(item.id));
			//
			// [...individuals, ...parents].forEach(shape => {
			// 	const newShape = loadShape(shape);
			//
			// 	if (newShape && shape.magnetizedChildrenIds.length > 0) {
			// 		shape.magnetizedChildrenIds.forEach(id => {
			// 			const children = shapesLoaded.find(item => item.id === id);
			// 			if (children) {
			// 				const newShapeChildren = loadShape(children);
			// 				if (newShapeChildren) {
			// 					newShape.magnetize(newShapeChildren, 0, KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE);
			// 				}
			// 			}
			//
			// 		});
			// 	}

			// });
			console.log(shapesLoaded);
		}
		// selectedShapes.push(shapes[0]);
		// keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;
	}

	// Array of image URLs
	const imageUrls = [
		'https://pixelcorner.fr/cdn/shop/files/pixel-art-kit-les-mojis-kits-de-loisirs-creatifs-par-pixel-corner-233999.jpg?v=1726439406&width=1920'
		// Add more URLs as needed
	];

	let images = [];
	let loading = true;

	// Function to load images
	async function loadImages() {
		try {
			const imagePromises = imageUrls.map(url => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.crossOrigin = 'anonymous'; // Enable CORS
					img.onload = () => resolve(img);
					img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
					img.src = url;
				});
			});

			images = await Promise.all(imagePromises);
			loading = false;
			draw();
		} catch (error) {
			console.error('Error loading images:', error);
			loading = false;
		}
	}

	onMount(async (): Promise<void> => {
		loadProgress('', false);
		canvas.width = width;
		canvas.height = height;
		await tick();
		draw();
		loadImages();

		// addRectangle();
		// keyWatcherConfig.mode = KeyWatcherMode.SELECTION_MAGNET;
	});

	// Effect for dimensions changes
	$effect(() => {
		// Trigger when width or height changes
		if (width && height) {
			canvasStatus.width = width;
			canvasStatus.height = height;
			if (width > canvasStatus.xMax) {
				canvasStatus.xMax = width;
			}
			canvas.width = canvasStatus.width;
			canvas.height = canvasStatus.height;
			if (height > canvasStatus.yMax) {
				canvasStatus.yMax = height;
			}
			draw();
		}
	});

	function saveProgress(toFile: boolean) {
		let data: ShapeSave[] = [];
		shapes.forEach(shape => {
			let exportedShape: ShapeSave = {
				borderRoundness: shape.borderRoundness,
				hint: '',
				lineWidth: shape.lineWidth,
				locked: shape.locked,
				magnetizedChildrenIds: shape.magnetizedChildren.map(item => item.id),
				id: shape.id,
				name: shape.name,
				opacityColor1: shape.opacityColor1,
				opacityColor2: shape.opacityColor2,
				r: shape.r,
				visible: shape.visible,
				type: shape.type,
				x: shape.x,
				y: shape.y,
				z: shape.z,
				w: shape.w,
				h: shape.h,
				text: shape.text,
				font: shape.font,
				fontSize: shape.fontSize,
				color1: shape.color1,
				color2: shape.color2,
				isArrow: shape.isArrow,
				isDotted: shape.isDotted,
				mW: shape.mW,
				mH: shape.mH,
				mR: shape.mR
			};
			data.push(exportedShape);
		});
		if (!toFile) {
			localStorage.setItem('shapes', JSON.stringify(data));
		} else {
			// Create a Blob with the JSON data
			const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

			// Create a temporary URL for the Blob
			const url = window.URL.createObjectURL(blob);

			// Create a link element
			const link = document.createElement('a');
			link.href = url;
			link.download = 'data.json'; // Set the filename

			// Append link to body (required for Firefox)
			document.body.appendChild(link);

			// Trigger download
			link.click();

			// Clean up
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
		}
	}

	$effect(() => {
		if (shapes) {
			draw();
			// saveProgress();
		}
	});

	$effect(() => {
		if (canvasStatus.backgroundColor) {
			draw();
			console.log(canvasStatus.backgroundColor);
		}
	});


	function saveCanvasToImage() {
		// Convert canvas to data URL
		const dataURL = canvas.toDataURL('image/png');

		// Create a link element
		const link = document.createElement('a');
		link.download = 'canvas-image.png'; // Filename
		link.href = dataURL;

		// This is required for Firefox
		link.style.display = 'none';
		document.body.appendChild(link);

		// Trigger download
		link.click();

		// Clean up
		document.body.removeChild(link);
	}


	function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
		ctx.save();

		if (shape.magnetizedParents.length > 0) {
			return;
		}

		if (shape.magnetizedChildren.length > 0) {
			ctx.save();
			ctx.translate(shape.x + shape.w / 2, shape.y + shape.h / 2);


			ctx.scale(shape.mW / 100, shape.mH / 100);
			ctx.rotate(shape.mR * Math.PI / 180);

			ctx.translate(-(shape.x + shape.w / 2), -(shape.y + shape.h / 2));
			shape.draw(ctx);
			shape.magnetizedChildren.forEach(shapeChildren => {
				shapeChildren.draw(ctx);
			});
			ctx.resetTransform();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.scale(camera.z, camera.z);
			ctx.translate(-canvas.width / 2 - camera.x, -canvas.height / 2 - camera.y);
		} else {
			shape.draw(ctx);
		}
	}

	function draw() {
		if (!canvas) {
			return;
		}
		let ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		ctx.reset();
		ctx.fillStyle = canvasStatus.backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Transform from center
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.scale(camera.z, camera.z);
		ctx.translate(-canvas.width / 2 - camera.x, -canvas.height / 2 - camera.y);

		let gridOld = new GridOld1(99, 99, 1, ctx, camera);
		gridOld.draw();

		let x = 0;
		images.forEach(img => {
			// Scale images to fit canvas if needed
			const height = canvas.height / 5;
			const width = (img.width / img.height) * height;

			ctx.drawImage(img, x, 0, width, height);
			x += width + 10; // Add 10px spacing between images
		});

		shapes.forEach(shape => {
			ctx.save();
			if (shape.magnetizedParents.length > 0) {
				const parent = shape.magnetizedParents[0];
				if (parent.magnetizedParents.length > 0) {
					const parenta = parent.magnetizedParents[0];
					ctx.translate(parenta.x + parenta.w / 2, parenta.y + parenta.h / 2);
					ctx.scale(parenta.mW / 100, parenta.mH / 100);
					ctx.rotate(parenta.mR * Math.PI / 180);

					ctx.translate(-(parenta.x + parenta.w / 2), -(parenta.y + parenta.h / 2));

					// ctx.rotate(parent.magnetizedParents[0].mR);
				}
				ctx.translate(parent.x + parent.w / 2, parent.y + parent.h / 2);
				ctx.scale(parent.mW / 100, parent.mH / 100);
				ctx.rotate(parent.mR * Math.PI / 180);

				ctx.translate(-(parent.x + parent.w / 2), -(parent.y + parent.h / 2));


				// ctx.rotate(parent.magnetizedParents[0].mR);
			}
			if (shape.magnetizedChildren.length > 0) {
				const parent = shape;
				ctx.translate(parent.x + parent.w / 2, parent.y + parent.h / 2);
				ctx.scale(parent.mW / 100, parent.mH / 100);
				ctx.rotate(parent.mR * Math.PI / 180);

				ctx.translate(-(parent.x + shape.w / 2), -(parent.y + parent.h / 2));

				// ctx.rotate(parent.magnetizedParents[0].mR);
			}
			shape.draw(ctx);
			ctx.restore();
		});

	}



	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		const { clientX, clientY, deltaX, deltaY, ctrlKey, altKey } = event;
		console.log(event);
		if (ctrlKey || altKey) {
			let newcamera = zoomCamera(camera, { x: clientX, y: clientY }, deltaY / 10000);
			camera.x = newcamera.x;
			camera.y = newcamera.y;
			camera.z = newcamera.z;
			// setCamera((camera) =>
			// 	zoomCamera(camera, { x: clientX, y: clientY }, deltaY / 100)
			// );
		} else {
			let newcamera = panCamera(camera, deltaX, deltaY);
			camera.x = newcamera.x;
			camera.y = newcamera.y;
			camera.z = newcamera.z;
		}
	}

	interface Point {
		x: number;
		y: number;
	}

	function panCamera(camera: Camera, dx: number, dy: number): Camera {
		dx = dx / 4.2;
		dy = dy / 1.7;
		return {
			x: camera.x - dx / camera.z,
			y: camera.y - dy / camera.z,
			z: camera.z
		};
	}

	function zoomCamera(camera: Camera, point: Point, dz: number): Camera {
		const zoom = camera.z - dz * camera.z;

		const p1 = screenToCanvas(point, camera);
		const p2 = screenToCanvas(point, { ...camera, z: zoom });

		return {
			x: camera.x + (p2.x - p1.x),
			y: camera.y + (p2.y - p1.y),
			z: zoom
		};
	}

	function screenToCanvas(point: Point, camera: Camera): Point {
		return {
			x: point.x / camera.z - camera.x,
			y: point.y / camera.z - camera.y
		};
	}

	function addRectangle() {
		let x = 100 + camera.x;
		let y = 200 + camera.y;
		let z = 1;

		if (selectedShapes.length > 0) {
			x = selectedShapes[0].x + selectedShapes[0].w + 100;
			y = selectedShapes[0].y;
		}
		let rectangle = new Rectangle(x, y, z, 100, 100);
		// if (camera.z > 1) {
		// 	rectangle = new Rectangle((canvas.width / 2 * camera.z), (canvas.height / 2 * camera.z), camera.z, 100, 100);
		// }
		shapes.push(rectangle);
		selectedShapes.length = 0;
		selectedShapes.push(rectangle);
		keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

	}

	function addTriangle() {
		let x = 100 + camera.x;
		let y = 200 + camera.y;
		let z = 1;

		if (selectedShapes.length > 0) {
			x = selectedShapes[0].x + selectedShapes[0].w + 100;
			y = selectedShapes[0].y;
		}
		let triangle = new Triangle(x, y, z, 100, 100);
		// if (camera.z > 1) {
		// 	rectangle = new Rectangle((canvas.width / 2 * camera.z), (canvas.height / 2 * camera.z), camera.z, 100, 100);
		// }
		shapes.push(triangle);
		selectedShapes.length = 0;
		selectedShapes.push(triangle);
		keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

	}

	function addCircle() {
		let x = 150 + camera.x;
		let y = 150 + camera.y;
		let z = 1;

		if (selectedShapes.length > 0) {
			x = selectedShapes[0].x + selectedShapes[0].w + 100;
			y = selectedShapes[0].y;
		}
		// let shape = new Circle(x, y, z, 50, 50);
		let shape = new Rectangle(x, y, z, 100, 100);
		shape.borderRoundness = 50;
		shape.type = 'circle';
		shapes.push(shape);
		selectedShapes.length = 0;
		selectedShapes.push(shape);
		keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

	}

	function addLine(isArrow: boolean, isDotted: boolean) {
		let x = 100 + camera.x;
		let y = 150 + camera.y;
		let z = 1;

		if (selectedShapes.length > 0) {
			x = selectedShapes[0].x + selectedShapes[0].w + 50;
			y = selectedShapes[0].y + selectedShapes[0].h / 2;
		}
		let shape = new Line(x, y, z, 100, 5);
		shape.isArrow = isArrow;
		shape.isDotted = isDotted;
		shapes.push(shape);
		selectedShapes.length = 0;
		selectedShapes.push(shape);
		keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

	}


	function addCheck() {
		let shape = new Check(100 + camera.x, 100 + camera.y, camera.z, 100, 100);
		shape.color1 = '#4CAF50';
		shape.lineWidth = 10;
		shapes.push(shape);
		selectedShapes.length = 0;
		selectedShapes.push(shape);
		keyWatcherConfig.mode = KeyWatcherMode.SELECTION_TRANSLATION;

	}

	function addShape(type: string) {
		console.log('adding ' + type);
		switch (type) {
			case 'rectangle':
				addRectangle();
				break;
			case 'circle':
				addCircle();
				break;
			case 'line':
				addLine(false, false);
				break;
			case 'arrow':
				addLine(true, false);
				break;
			case 'line-dash':
				addLine(false, true);
				break;
			case 'check':
				addCheck();
				break;
			case 'text':
				addText();
				break;
			case 'triangle':
				addTriangle();
				break;
		}
	}

	function addText() {
		let x = 100 + camera.x;
		let y = 100 + camera.y;
		let z = 1;

		if (selectedShapes.length > 0) {
			x = selectedShapes[0].x + selectedShapes[0].w + 100;
			y = selectedShapes[0].y;
		}
		let text = new Text('', 48, x, y, z, 30, 30);
		// let text1 = new CTextSvelte('',48, 100 + camera.x, 100 + camera.y, 0, 30, 30);
		shapes.push(text);
		selectedShapes.length = 0;
		selectedShapes.push(text);
		keyWatcherConfig.mode = KeyWatcherMode.SELECTION_EDIT;

	}


</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height} onwheel={handleWheel}>
	<canvas bind:this={canvas} width="{width}"></canvas>
</div>
<KeyWatcher></KeyWatcher>
<CameraControls />
<ShapesToolbar />

