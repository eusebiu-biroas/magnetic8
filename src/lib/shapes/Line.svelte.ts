import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import type Shape from '$lib/types/Shape';
import { canvasStatus, shapes } from '$lib/shared.svelte';

export class Line extends ShapeBasic {
	type: string = 'line';
	name: string = $state(this.type + '_' + this.id);
	isArrow: boolean = false;
	isDotted: boolean = false;
	color1: string = $state('rgb(159,7,7)');


	drawShape(ctx: CanvasRenderingContext2D) {
		const headlen = 10;
		const angle = Math.atan2(this.y - this.y, this.x + this.w - this.x);

		ctx.save();
		ctx.strokeStyle = this.applyOpacity(this.color1, this.opacityColor1);

		ctx.translate(this.x, this.y);

		ctx.rotate((this.r * Math.PI) / 180);

		ctx.translate(-this.x, -this.y);

		//starting path of the arrow from the start square to the end square
		//and drawing the stroke
		ctx.beginPath();
		if (this.isDotted) {
			ctx.setLineDash([10, 10]);
		}

		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.w, this.y);
		ctx.lineWidth = this.h;
		ctx.stroke();

		if (this.isArrow) {
			//starting a new path from the head of the arrow to one of the sides of
			//the point
			ctx.beginPath();

			ctx.moveTo(this.x + this.w, this.y);
			ctx.lineTo(
				this.x + this.w - headlen * Math.cos(angle - Math.PI / 7),
				this.y - headlen * Math.sin(angle - Math.PI / 7)
			);

			//path from the side point of the arrow, to the other side point
			ctx.lineTo(
				this.x + this.w - headlen * Math.cos(angle + Math.PI / 7),
				this.y - headlen * Math.sin(angle + Math.PI / 7)
			);

			//path from the side point back to the tip of the arrow, and then
			//again to the opposite side point
			ctx.lineTo(this.x + this.w, this.y);
			ctx.lineTo(
				this.x + this.w - headlen * Math.cos(angle - Math.PI / 7),
				this.y - headlen * Math.sin(angle - Math.PI / 7)
			);

			//draws the paths created above
			ctx.stroke();
		}
		ctx.restore();
		// ctx.save();
		// ctx.rotate(45);
		// ctx.strokeStyle = ctx.fillStyle;
		// ctx.lineWidth = this.h;
		// ctx.beginPath();
		// ctx.moveTo(this.x, this.y);
		// ctx.lineTo(this.x + this.w, this.y);
		// ctx.stroke();
		// ctx.restore();
		//
		// this.drawArrow(ctx,this.x, this.y,this.x+this.w, this.y, this.h, this.strokeStyle);
		// ctx.save();
		// ctx.lineWidth = this.h;
		// const startPoint = {
		// 	x: this.x,
		// 	y: this.y
		// };
		// const endPoint = {
		// 	x: startPoint.x + this.w,
		// 	y: startPoint.y
		// };
		//
		// ctx.beginPath();
		// ctx.setLineDash([10, 10]);
		// //
		// // // rotate around center - find mid-point using lerp
		// // const midPoint = {
		// // 	x: startPoint.x + (endPoint.x - startPoint.x) * 0.5,
		// // 	y: startPoint.y + (endPoint.y - startPoint.y) * 0.5
		// // };
		//
		// // rotate around center - find mid-point using lerp
		// const midPoint = {
		// 	x: startPoint.x,
		// 	y: startPoint.y
		// };
		//
		// // translate to midpoint
		// ctx.translate(midPoint.x, midPoint.y);
		//
		// // rotate some angle (radians)
		// ctx.rotate(0.25 * Math.PI);  // = 45°
		//
		// // translate back
		// ctx.translate(-midPoint.x, -midPoint.y);
		//
		// // draw line
		// ctx.moveTo(startPoint.x, startPoint.y);
		// ctx.lineTo(endPoint.x, endPoint.y);
		// ctx.stroke();
		// ctx.closePath();
		//
		// // reset transforms
		// ctx.setTransform(1,0,0,1,0,0);
		// ctx.restore();
	}

	protected drawGuideLine(ctx: CanvasRenderingContext2D) {}

	clone(): Shape {
		const clone = new Line(this.x, this.y, this.z, this.w, this.h);
		clone.r = this.r;
		clone.color1 = this.color1;
		clone.color2 = this.color2;
		clone.opacityColor1 = this.opacityColor1;
		clone.opacityColor2 = this.opacityColor2;
		clone.lineWidth = this.lineWidth;
		clone.borderRoundness = this.borderRoundness;
		shapes.push(clone);
		return clone;
	}
}
