import { ShapeBasic } from '$lib/shapes/ShapeBasic.svelte';
import type Shape from '$lib/types/Shape';
import { KeyWatcherMode, shapes } from '$lib/shared.svelte';

export class Rectangle extends ShapeBasic {
	type: string = 'rectangle';
	name: string = $state(this.type + '_' + this.id);

	drawShape(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate((this.r * Math.PI) / 180);

		ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));

		ctx.strokeStyle = this.applyOpacity(this.color2, this.opacityColor2);
		ctx.fillStyle = this.applyOpacity(this.color1, this.opacityColor1);

		ctx.lineWidth = Math.abs(this.lineWidth);
		if (this.lineWidth < 0) {
			ctx.setLineDash([10, 10]);
		}
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.w, this.h, this.borderRoundness);
		ctx.fill();

		ctx.stroke();

		ctx.restore();
	}

	clone(): Shape {
		const clone = new Rectangle(this.x, this.y, this.z, this.w, this.h);
		clone.color1 = this.color1;
		clone.color2 = this.color2;
		clone.opacityColor1 = this.opacityColor1;
		clone.opacityColor2 = this.opacityColor2;
		clone.r = this.r;
		clone.borderRoundness = this.borderRoundness;
		clone.lineWidth = this.lineWidth;
		clone.mW = this.mW;
		clone.mH = this.mH;
		clone.mR = this.mR;
		shapes.push(clone);
		if (this.magnetizedChildren.length > 0) {
			this.magnetizedChildren.forEach((item) => {
				const cloneChild = item.clone();
				// shapes.push(cloneChild);
				clone.magnetize(cloneChild, 0, KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE);
			});
		}
		return clone;
	}
}
