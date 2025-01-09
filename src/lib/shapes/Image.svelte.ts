import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import { canvasStatus } from '$lib/shared.svelte';

export class Triangle extends ShapeBasic {
	type: string = 'image';
	name: string = $state(this.type + '_' + this.id);

	drawShape(ctx: CanvasRenderingContext2D) {
		// Save the current canvas state
		ctx.save();

		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate((this.r * Math.PI) / 180);

		ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
		const width = this.w;
		const height = this.h;


		// Calculate points
		const baseX = this.x ;  // Fixed base point X
		const baseY = this.y+this.h;  // Fixed base point Y

		const rightX = baseX + width;
		const rightY = baseY;

		const topX = baseX + (width / 2);
		const topY = baseY - height;

		// Start drawing
		ctx.beginPath();
		ctx.strokeStyle = this.applyOpacity(this.color2, this.opacityColor2);
		ctx.fillStyle = this.applyOpacity(this.color1, this.opacityColor1);
		// Draw the triangle
		ctx.moveTo(baseX, baseY);    // Base point
		ctx.lineTo(rightX, rightY);  // Right point
		ctx.lineTo(topX, topY);      // Top point
		ctx.closePath();

		// Fill the triangle
		ctx.fill();

		// Add stroke
		ctx.strokeStyle = '#2E7D32';
		ctx.lineWidth = 2;
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
}
