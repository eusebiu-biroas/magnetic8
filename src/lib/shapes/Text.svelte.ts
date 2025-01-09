import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import type Shape from '$lib/types/Shape';
import { canvasStatus, keyWatcherConfig, KeyWatcherMode, selectedShapes, shapes } from '$lib/shared.svelte';

export class Text extends ShapeBasic {
	type: string = 'text';
	name: string = $state(this.type + '_' + this.id);
	fontSize: number;

	constructor(text: string, fontSize: number, x: number, y: number, z: number, w: number, h: number) {
		super(x, y, z, w, h)
		this.text = text;
		this.font = 'serif';
		this.fontSize = fontSize;
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		this.h = h;
	}

	drawShape(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.fillStyle = this.color1;
		ctx.font = this.fontSize + 'px '+ this.font;

		let renderText = this.text;

		if(!this.text && (selectedShapes.length>0 && selectedShapes[0].id!=this.id ||keyWatcherConfig.mode !== KeyWatcherMode.SELECTION_EDIT))
		{
			renderText = '-text-';
		}


		 if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_EDIT && selectedShapes && selectedShapes[0].id == this.id) {

			 renderText = [this.text.slice(0, this.caretPosition), '|', this.text.slice(this.caretPosition)].join('');
		 }
		const lines = renderText.split('\n');

		const measure = ctx.measureText(renderText || 'A');
		const lineHeight = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent+10;
		this.h = lines.length * lineHeight;
		this.w = measure.width;
		ctx.translate(this.x+this.w/2, this.y+this.h/2);

		ctx.rotate(this.r * Math.PI/180);

		ctx.translate(-(this.x+this.w/2), -(this.y+this.h/2));

		// if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_EDIT && selectedShapes && selectedShapes[0].id == this.id) {
		// 	lines = (this.text + '|').split('\n');
		// }

		lines.forEach((line, index) => {
			ctx.fillText(line, this.x, this.y + (index+1)* lineHeight);
		});
		ctx.restore();
	}

	clone(): Shape {
		const clone = new Text(this.text, this.fontSize, this.x, this.y, this.z, this.w, this.h);
		clone.color1 = this.color1;
		clone.color2 = this.color2;
		clone.opacityColor1 = this.opacityColor1;
		clone.opacityColor1 = this.opacityColor2;
		shapes.push(clone);
		return clone;
	}

	scale(scaleWidth: number, scaleHeight: number): void {
		this.fontSize += scaleWidth;
		this.fontSize += scaleHeight;
	}
	protected drawGuideLine(ctx: CanvasRenderingContext2D) {
		super.drawGuideLine(ctx);
	}
	protected drawSize(ctx: CanvasRenderingContext2D) {}

}

