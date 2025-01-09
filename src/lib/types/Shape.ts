import type { KeyWatcherMode } from '$lib/shared.svelte';

export default interface Shape {
	id: number;
	name: string;
	type: string;
	hint: string;
	text: string;
	font: string;
	fontSize: number;
	visible: boolean;
	locked: boolean;
	x: number;
	y: number;
	z: number;
	w: number;
	h: number;
	r: number;
	mW: number;
	mH: number;
	mR: number;
	magnetizedChildren: Shape[];
	magnetizedParents: Shape[];
	color1: string;
	color2: string;
	opacityColor1: number;
	opacityColor2: number;
	lineWidth: number;
	borderRoundness: number;
	isArrow: boolean;
	isDotted: boolean;
	caretPosition: number;
	importId: number;

	draw(ctx: CanvasRenderingContext2D): void;

	clone(): Shape;

	translate(x: number, y: number): void;

	rotate(angle: number): void;

	scale(scaleWidth: number, scaleHeight: number, isMagnetic: boolean): void;

	magnetize(shape: Shape, multiplier: number, mode: KeyWatcherMode): void;

	adjustBorderRoundness(incrementValue: number, magnetize: boolean): void;

	adjustBorderWidth(incrementValue: number, magnetize: boolean): void;

	adjustColor1(color: string, magnetize: boolean): void;

	adjustColor2(color: string, magnetize: boolean): void;

	adjustColor1Opacity(incrementValue: number, magnetize: boolean): void;

	adjustColor2Opacity(incrementValue: number, magnetize: boolean): void;
}
