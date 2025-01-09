import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import { canvasStatus, shapes } from '$lib/shared.svelte';
import type Shape from '$lib/types/Shape';

export class Check extends ShapeBasic {
	type: string = 'check';
	name: string = $state(this.type + '_' + this.id);

	drawShape(ctx: CanvasRenderingContext2D) {
		// Save the current canvas state
		ctx.save();

		// const lineWidth = Math.max(this.w / 10, 2);
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate((this.r * Math.PI) / 180);

		ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
		// Start drawing
		ctx.beginPath();
		ctx.strokeStyle = this.color1;
		ctx.lineWidth = Math.abs(this.lineWidth);
		if (this.lineWidth < 0) {
			ctx.setLineDash([10, 10]);
		}
		// ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		// Calculate points relative to x, y and size
		const startX = this.x;
		const startY = this.y+50;
		const midX = startX + (this.w * 0.35);
		const midY = startY + (this.h * 0.3);
		const endX = startX + this.w;
		const endY = startY - (this.w * 0.3);

		// Draw the checkmark
		ctx.moveTo(startX, startY);
		ctx.lineTo(midX, midY);
		ctx.lineTo(endX, endY);

		ctx.stroke();

		// Restore the canvas state
		ctx.restore();


	}

	clone(): Shape {
		const clone = new Check(this.x, this.y, this.z, this.w, this.h);
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
