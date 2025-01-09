import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import { canvasStatus, shapes } from '$lib/shared.svelte';
import type Shape from '$lib/types/Shape';

export class Triangle extends ShapeBasic {
	type: string = 'triangle';
	name: string = this.type + '_' + ++canvasStatus.shapeCounter;

	drawShape(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate((this.r * Math.PI) / 180);

		ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
		const width = this.w;
		const height = this.h;

		// Calculate points
		const baseX = this.x; // Fixed base point X
		const baseY = this.y + this.h; // Fixed base point Y

		const rightX = baseX + width;
		const rightY = baseY;

		const topX = baseX + width / 2;
		const topY = baseY - height;

		// Start drawing
		ctx.beginPath();
		ctx.strokeStyle = this.applyOpacity(this.color2, this.opacityColor2);
		ctx.fillStyle = this.applyOpacity(this.color1, this.opacityColor1);
		ctx.lineWidth = Math.abs(this.lineWidth);
		if (this.lineWidth < 0) {
			ctx.setLineDash([10, 10, 10]);
		}
		// Draw the triangle
		ctx.moveTo(baseX, baseY); // Base point
		ctx.lineTo(rightX, rightY); // Right point
		ctx.lineTo(topX, topY); // Top point
		ctx.closePath();

		// Fill the triangle
		ctx.fill();
		ctx.stroke();

		// // Draw points
		// ctx.fillStyle = '#FF0000';
		// [
		// 	[baseX, baseY],
		// 	[rightX, rightY],
		// 	[topX, topY]
		// ].forEach(([x, y]) => {
		// 	ctx.beginPath();
		// 	ctx.arc(x, y, 4, 0, Math.PI * 2);
		// 	ctx.fill();
		// });
		// Restore the canvas state
		ctx.restore();
	}

	clone(): Shape {
		const clone = new Triangle(this.x, this.y, this.z, this.w, this.h);
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
