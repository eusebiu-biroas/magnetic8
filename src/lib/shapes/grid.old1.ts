import type Camera from '$lib/types/Camera';
import { camera } from '$lib/shared.svelte';

class GridOld1 {
	ctx: CanvasRenderingContext2D | null;
	needsRedraw: boolean;
	cellWidth: number;
	cellHeight: number;
	lineWidth: number;
	layers: number;
	layerSubdivisions: number;
	camera: any;

	constructor(
		cellWidth: number,
		celHeight: number,
		lineWidth: number,
		ctx: CanvasRenderingContext2D | null,
		camera: any
	) {
		this.ctx = ctx;
		this.needsRedraw = true;
		this.cellWidth = cellWidth;
		this.cellHeight = celHeight;
		this.lineWidth = lineWidth;
		this.layers = 2;
		this.layerSubdivisions = 1;
		this.camera = camera;
	}

	draw1() {
		if (!this.ctx) {
			return;
		}
		const zoom = 1;

		for (let s = 1; s <= this.layers; s++) {
			for (let i = 0; i < this.ctx.canvas.width; i += (this.cellWidth + this.lineWidth)/(s*this.layerSubdivisions)) {
				const x = i;
				const alpha = 1 / zoom;
				this.ctx.strokeStyle = `rgba(104,104,104,${alpha})`;
				this.ctx.lineWidth = this.lineWidth * zoom - 5 * Math.floor(zoom / 5);
				this.ctx.beginPath();
				this.ctx.moveTo(x, 0);
				this.ctx.lineTo(x, this.ctx.canvas.height / zoom);
				this.ctx.stroke();
			}

			for (let i = 1; i <= this.ctx.canvas.height / zoom; i += (this.cellHeight + this.lineWidth)/(s*this.layerSubdivisions)) {
				// ctx.strokeStyle = 'rgba(38,38,38,1)';
				const alpha = 1/5 * zoom;
				this.ctx.strokeStyle = `rgba(104,104,104,${alpha})`;
				this.ctx.strokeStyle = 'rgb(104,104,104)';

				this.ctx.lineWidth = this.lineWidth * zoom - 5 * Math.floor(zoom / 5);
				console.log('a', this.ctx.lineWidth);
				this.ctx.beginPath();
				this.ctx.moveTo(0, i);
				this.ctx.lineTo(this.ctx.canvas.width / zoom, i);
				this.ctx.stroke();
			}
		}
	}
	draw() {
		this.lineWidth=1;
		if (!this.ctx) {
			return;
		}
		// const zoomx = camera.z;
		// this.ctx.scale(zoomx,zoomx);
		// this.ctx.translate(camera.x,camera.y);

		this.ctx.save();

		for (let s = 1; s <= this.layers; s++) {
			let zoom=1
			if(s==2){
				zoom= 1/4
			}

			if(s==3){
				zoom= 1/4
			}
			this.ctx.scale(zoom,zoom);
			for (let i = 0; i < (this.ctx.canvas.width+camera.x)/zoom; i+= (this.cellHeight + this.lineWidth)) {
				const x = i;
				const alpha = 1 / zoom;
				this.ctx.strokeStyle = `rgba(104,104,104,${alpha})`;
				this.ctx.strokeStyle = `rgba(104,104,104,1)`;
				this.ctx.lineWidth = this.lineWidth * zoom - 5 * Math.floor(zoom / 5);
				this.ctx.lineWidth = this.lineWidth ;
				this.ctx.beginPath();
				this.ctx.moveTo(x, 0);
				this.ctx.lineTo(x, this.ctx.canvas.height*s);
				this.ctx.lineTo(x, (this.ctx.canvas.height+camera.y)/zoom);
				this.ctx.stroke();
			}

			for (let i = 0; i < (this.ctx.canvas.height+camera.y)/zoom; i += (this.cellHeight + this.lineWidth)) {
				// ctx.strokeStyle = 'rgba(38,38,38,1)';
				const alpha = 1/5 * zoom;
				this.ctx.strokeStyle = `rgba(104,104,104,${alpha})`;
				this.ctx.strokeStyle = 'rgb(104,104,104)';

				this.ctx.lineWidth = this.lineWidth * zoom - 5 * Math.floor(zoom / 5);
				this.ctx.lineWidth = this.lineWidth
				this.ctx.beginPath();
				this.ctx.moveTo(0, i);
				this.ctx.lineTo((this.ctx.canvas.width+camera.x) / zoom, i);
				this.ctx.stroke();
			}

		}
		this.ctx.restore();


	}
}

export default GridOld1;
