import type Shape from '$lib/types/Shape';
import type Camera from '$lib/types/Camera';

export enum KeyWatcherMode {
	STANDARD = 'STANDARD',
	INSERT = 'INSERT',
	FIND = 'FIND',
	SELECTION_TRANSLATION = 'SELECTION_TRANSLATION',
	SELECTION_SCALE = 'SELECTION_SCALE',
	SELECTION_ROTATE = 'SELECTION_ROTATE',
	SELECTION_MAGNET = 'SELECTION_MAGNET',
	SELECTION_MAGNETIZE_MULTIPLE = 'SELECTION_MAGNETIZE_MULTIPLE',
	SELECTION_MAGNET_LEFT = 'SELECTION_MAGNET_LEFT',
	SELECTION_MAGNET_RIGHT = 'SELECTION_MAGNET_RIGHT',
	SELECTION_MAGNET_TOP = 'SELECTION_MAGNET_TOP',
	SELECTION_MAGNET_BOTTOM = 'SELECTION_MAGNET_BOTTOM',
	SELECTION_COLOR_1 = 'SELECTION_COLOR_1',
	SELECTION_COLOR_2 = 'SELECTION_COLOR_2',
	SELECTION_EDIT = 'SELECTION_EDIT',
	SELECTION_BORDER_WIDTH_AND_ROUNDNESS = 'SELECTION_BORDER_WIDTH_AND_ROUNDNESS',
	SELECTION_OPACITY = 'SELECTION_OPACITY',
	BOOKMARKS = 'BOOKMARKS',
	SAVE_PROGRESS = 'SAVE_PROGRESS',
	LOAD_PROGRESS = 'LOAD_PROGRESS',
}

export const shapes: Shape[] = $state([]);
export const selectedShapes: Shape[] = $state([]);
export const clipboard: Shape[] = $state([]);
export const bookmarks: Shape[] = $state([]);
export const keyWatcherConfig: any = $state({ mode: KeyWatcherMode.STANDARD, multiplier: 10 });
export const camera: Camera = $state({
	x: 0,
	y: 0,
	z: 1
});
export const canvasStatus = $state({
	maxLeft: 0,
	xMin: 0,
	xMax: 0,
	yMin: 0,
	yMax: 0,
	zMin: 0,
	zMax: 0,
	width: 0,
	height: 0,
	backgroundColor:'rgba(17,24,39,1)',
	shapeCounter: 0,
	hintSearched: ''
});
export const multiplier = $state({
	STANDARD_TRANSLATION : 100,
	STANDARD_ZOOM : 3,
	SELECTION_TRANSLATION : 100,
	SELECTION_SCALING : 10,
	SELECTION_ROTATION : 15,
	PASTE : 1
})

