export default interface ShapeSave {
	id: number;
	name: string;
	type: string;
	hint: string;
	text: string;
	font: string;
	fontSize: number;
	visible: boolean;
	locked: boolean;
	isArrow: boolean;
	isDotted: boolean;
	x: number;
	y: number;
	z: number;
	w: number;
	h: number;
	r: number;
	mW: number;
	mH: number;
	mR: number;
	magnetizedChildrenIds: number[];
	color1: string;
	color2: string;
	opacityColor1: number;
	opacityColor2: number;
	lineWidth: number;
	borderRoundness: number;
}
