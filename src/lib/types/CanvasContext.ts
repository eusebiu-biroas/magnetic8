export default interface CanvasContext {
	addRectangle(): void;
	addText(): void;
	addShape(type: string): void;
	draw(): void;
	saveProgress(toFile: boolean): void;
	loadProgress(json: string, add:boolean): void;
	saveCanvasToImage(): void;
}