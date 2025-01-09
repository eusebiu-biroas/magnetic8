import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import { canvasStatus } from '$lib/shared.svelte';

export class Circle extends ShapeBasic {

	type: string = 'circle';
	name: string = $state(this.type + '_' + this.id);

	drawShape(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
}