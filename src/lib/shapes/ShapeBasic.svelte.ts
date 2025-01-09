import type Shape from '$lib/types/Shape';
import {
	camera,
	canvasStatus,
	keyWatcherConfig,
	KeyWatcherMode,
	selectedShapes
} from '$lib/shared.svelte.js';

interface Point {
	x: number;
	y: number;
}

export class ShapeBasic implements Shape {
	id: number = ++canvasStatus.shapeCounter;
	name = $state('');
	type: string = 'basic';
	text: string = $state('');
	font: string = $state('');
	fontSize: number = $state(16);
	hint: string = $state('');
	locked: boolean = $state(false);
	visible: boolean = $state(true);
	fillStyle = 'rgba(255,255,255,0.45)';
	strokeStyle = 'rgb(159,7,7)';
	x: number = $state(0);
	y: number = $state(0);
	z: number = $state(0);
	w: number = $state(0);
	h: number = $state(0);
	r: number = $state(0);
	mW: number = $state(100);
	mH: number = $state(100);
	mR: number = $state(0);
	magnetizedChildren: Shape[] = $state([]);
	magnetizedParents: Shape[] = $state([]);

	color1: string = $state('rgb(255,255,255)');
	color2: string = $state('rgb(159,7,7)');
	opacityColor1: number = $state(45);
	opacityColor2: number = $state(100);
	lineWidth: number = $state(2);
	borderRoundness: number = $state(0);
	isArrow: boolean = false;
	isDotted: boolean = false;
	caretPosition: number = 0;
	importId: number = 0;

	constructor(x: number, y: number, z: number, w: number, h: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		this.h = h;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.drawShape(ctx);

		if (
			keyWatcherConfig.mode === KeyWatcherMode.FIND ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_RIGHT ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_LEFT ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_TOP ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_BOTTOM ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE
		) {
			ctx.save();
			ctx.fillStyle = 'rgba(178,165,23,0.73)';
			if (this.magnetizedParents.length > 0) {
				ctx.fillStyle = 'rgba(95,158,160,0.73)';
			}
			ctx.beginPath();
			ctx.roundRect(this.x, this.y, 30, 30, 2);
			ctx.fill();
			ctx.fillStyle = 'black';
			ctx.font = '16px serif';
			ctx.fillText(this.hint.toUpperCase(), this.x + 5, this.y + 20);
			ctx.restore();
		}

		const arrowLength = 20;
		const arrowWidth = 10;
		if (selectedShapes.includes(this)) {
			if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_TRANSLATION) {
				this.drawMoveArrows(ctx, arrowLength, arrowWidth);
			} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_SCALE) {
				this.drawScaleArrows(ctx, arrowLength, arrowWidth);
			} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_ROTATE) {
				this.drawRotationArrows(ctx, arrowLength, arrowWidth);
			} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET) {
				this.drawMagnets(ctx, arrowLength * 0.6);
			}
			if (
				[
					KeyWatcherMode.SELECTION_TRANSLATION,
					KeyWatcherMode.SELECTION_SCALE,
					KeyWatcherMode.SELECTION_SCALE,
					KeyWatcherMode.SELECTION_MAGNET,
					KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS,
					KeyWatcherMode.SELECTION_OPACITY,
					KeyWatcherMode.SELECTION_ROTATE
				].includes(keyWatcherConfig.mode)
			) {
				const labelSize = 20;
				const labelPadding = 5;
				this.drawLabels(
					ctx,
					keyWatcherConfig.mode,
					arrowLength,
					arrowWidth,
					labelSize,
					labelPadding
				);
				if (keyWatcherConfig.mode !== KeyWatcherMode.SELECTION_ROTATE) {
					this.drawSize(ctx);
				} else {
					this.drawRotation(ctx);
				}
				this.drawGuideLine(ctx);
			}
		}
	}

	drawOld(ctx: CanvasRenderingContext2D): void {
		ctx.save();

		// ctx.translate(this.x*this.z, this.y*this.z);
		ctx.scale(1 / this.z, 1 / this.z);
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;

		if (keyWatcherConfig.mode == KeyWatcherMode.FIND) {
			ctx.globalAlpha = 0.5;
		}
		this.drawShape(ctx);
		ctx.save();
		ctx.resetTransform();
		ctx.translate(canvasStatus.width / 2, canvasStatus.height / 2);
		ctx.scale(camera.z, camera.z);
		ctx.translate(-canvasStatus.width / 2 - camera.x, -canvasStatus.height / 2 - camera.y);
		if (keyWatcherConfig.mode == KeyWatcherMode.FIND) {
			ctx.globalAlpha = 1;
		}
		if (
			keyWatcherConfig.mode === KeyWatcherMode.FIND ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_RIGHT ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_LEFT ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_TOP ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET_BOTTOM ||
			keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNETIZE_MULTIPLE
		) {
			ctx.save();
			ctx.fillStyle = 'rgba(178,165,23,0.73)';
			if (this.magnetizedParents.length > 0) {
				ctx.fillStyle = 'rgba(95,158,160,0.73)';
			}
			ctx.beginPath();
			ctx.roundRect(this.x, this.y, 30, 30, 2);
			ctx.fill();
			ctx.fillStyle = 'black';
			ctx.font = '16px serif';
			ctx.fillText(this.hint.toUpperCase(), this.x + 5, this.y + 20);
			ctx.restore();
		}

		// Arrow properties
		const arrowLength = 20;
		const arrowWidth = 10;

		// Save current context state
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.strokeStyle;

		if (selectedShapes.includes(this)) {
			if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_TRANSLATION) {
				this.drawMoveArrows(ctx, arrowLength, arrowWidth);
			} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_SCALE) {
				this.drawScaleArrows(ctx, arrowLength, arrowWidth);
			} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_ROTATE) {
				this.drawRotationArrows(ctx, arrowLength, arrowWidth);
			} else if (keyWatcherConfig.mode === KeyWatcherMode.SELECTION_MAGNET) {
				this.drawMagnets(ctx, arrowLength * 0.6);
			}
			if (
				[
					KeyWatcherMode.SELECTION_TRANSLATION,
					KeyWatcherMode.SELECTION_SCALE,
					KeyWatcherMode.SELECTION_SCALE,
					KeyWatcherMode.SELECTION_MAGNET,
					KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS,
					KeyWatcherMode.SELECTION_OPACITY
				].includes(keyWatcherConfig.mode)
			) {
				const labelSize = 20;
				const labelPadding = 5;
				this.drawLabels(
					ctx,
					keyWatcherConfig.mode,
					arrowLength,
					arrowWidth,
					labelSize,
					labelPadding
				);
				this.drawSize(ctx);
				this.drawGuideLine(ctx);
			}
		}
		ctx.restore();
		ctx.restore();
	}

	drawShape(ctx: CanvasRenderingContext2D) {
		console.log('drawShape Basic',ctx);
	}

	protected drawSize(ctx: CanvasRenderingContext2D) {
		ctx.save();
		// Draw text
		ctx.fillStyle = 'white';
		ctx.font = '14px serif';

		const text = this.w + ' x ' + this.h;
		ctx.fillText(
			text,
			this.x + this.w / 2 - ctx.measureText(text).width / 2,
			this.y + this.h / 2 + 5
		);
		ctx.restore();
	}

	protected drawRotation(ctx: CanvasRenderingContext2D) {
		ctx.save();
		// Draw text
		ctx.fillStyle = 'white';
		ctx.font = '14px serif';

		const text = this.r + '°';
		ctx.fillText(
			text,
			this.x + this.w / 2 - ctx.measureText(text).width / 2,
			this.y + this.h / 2 + 5
		);
		ctx.restore();
	}

	protected drawGuideLine(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.strokeStyle = 'rgba(159,7,7,1)';
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate((this.r * Math.PI) / 180);

		// if (this.magnetizedParents.length > 0 || this.magnetizedChildren.length > 0) {
		// 	ctx.scale(this.mW / 100, this.mH / 100);
		// 	ctx.rotate((this.mR * Math.PI) / 180);
		// }

		ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
		// Start a new Path
		ctx.beginPath();
		ctx.moveTo(0, this.y);
		ctx.lineTo(canvasStatus.width, this.y);

		// Draw the Path
		ctx.stroke();

		// Start a new Path
		ctx.beginPath();
		ctx.moveTo(0, this.y + this.h);
		ctx.lineTo(canvasStatus.width, this.y + this.h);

		// Draw the Path
		ctx.stroke();

		// Start a new Path
		ctx.beginPath();
		ctx.moveTo(this.x, 0);
		ctx.lineTo(this.x, canvasStatus.height);

		// Draw the Path
		ctx.stroke();

		// Start a new Path
		ctx.beginPath();
		ctx.moveTo(this.x + this.w, 0);
		ctx.lineTo(this.x + this.w, canvasStatus.height);

		// Draw the Path
		ctx.stroke();
		ctx.restore();
	}

	private drawMoveArrows(
		ctx: CanvasRenderingContext2D,
		arrowLength: number,
		arrowWidth: number
	): void {
		ctx.save();
		ctx.fillStyle = this.strokeStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = 2;
		// Movement arrows are single-headed
		const directions = [
			{ dx: 1, dy: 0 }, // right
			{ dx: -1, dy: 0 }, // left
			{ dx: 0, dy: -1 }, // up
			{ dx: 0, dy: 1 } // down
		];

		directions.forEach((dir) => {
			const start = this.getArrowStart(dir);
			const end = {
				x: start.x + dir.dx * arrowLength,
				y: start.y + dir.dy * arrowLength
			};

			// Draw arrow shaft
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();

			// Draw arrowhead
			ctx.beginPath();
			ctx.moveTo(end.x, end.y);
			if (dir.dx !== 0) {
				// horizontal arrows
				ctx.lineTo(end.x - dir.dx * arrowWidth, end.y - arrowWidth / 2);
				ctx.lineTo(end.x - dir.dx * arrowWidth, end.y + arrowWidth / 2);
			} else {
				// vertical arrows
				ctx.lineTo(end.x - arrowWidth / 2, end.y - dir.dy * arrowWidth);
				ctx.lineTo(end.x + arrowWidth / 2, end.y - dir.dy * arrowWidth);
			}
			ctx.closePath();
			ctx.fill();
		});
		ctx.restore();
	}

	private drawScaleArrows(
		ctx: CanvasRenderingContext2D,
		arrowLength: number,
		arrowWidth: number
	): void {
		// Scale arrows are double-headed and include diagonals
		const directions = [
			{ dx: 1, dy: 0 }, // right
			{ dx: -1, dy: 0 }, // left
			{ dx: 0, dy: -1 }, // up
			{ dx: 0, dy: 1 } // down
			// { dx: 1, dy: 1 }, // bottom-right
			// { dx: -1, dy: 1 }, // bottom-left
			// { dx: 1, dy: -1 }, // top-right
			// { dx: -1, dy: -1 } // top-left
		];
		ctx.fillStyle = this.strokeStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = 2;
		arrowLength = arrowLength + 4;

		directions.forEach((dir) => {
			const start = this.getArrowStart(dir);
			const length = Math.sqrt(dir.dx * dir.dx + dir.dy * dir.dy) * arrowLength;
			const end = {
				x: start.x + dir.dx * length,
				y: start.y + dir.dy * length
			};

			// Draw arrow shaft
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();

			// Draw both arrowheads
			this.drawDoubleArrowhead(ctx, start, end, arrowWidth);
		});
	}

	private drawRotationArrows(
		ctx: CanvasRenderingContext2D,
		arrowLength: number,
		arrowWidth: number
	): void {
		const corners = [
			{ x: this.x, y: this.y }, // Top-left
			{ x: this.x + this.w, y: this.y }, // Top-right
			{ x: this.x + this.w, y: this.y + this.h }, // Bottom-right
			{ x: this.x, y: this.y + this.h } // Bottom-left
		];
		ctx.save();
		corners.forEach((corner, index) => {
			const radius = arrowLength;
			const startAngle = (index * Math.PI) / 2 - Math.PI / 4;
			const endAngle = startAngle + Math.PI / 2;

			ctx.fillStyle = this.strokeStyle;
			ctx.strokeStyle = this.strokeStyle;
			ctx.lineWidth = 2;
			// Draw arc
			ctx.beginPath();
			ctx.arc(corner.x, corner.y, radius, startAngle, endAngle);
			ctx.stroke();

			// Calculate arrowhead position
			const arrowX = corner.x + radius * Math.cos(endAngle);
			const arrowY = corner.y + radius * Math.sin(endAngle);

			// Draw arrowhead
			const angle = endAngle + Math.PI / 2;
			ctx.beginPath();
			ctx.moveTo(arrowX, arrowY);
			ctx.lineTo(
				arrowX - arrowWidth * Math.cos(angle - Math.PI / 6),
				arrowY - arrowWidth * Math.sin(angle - Math.PI / 6)
			);
			ctx.lineTo(
				arrowX - arrowWidth * Math.cos(angle + Math.PI / 6),
				arrowY - arrowWidth * Math.sin(angle + Math.PI / 6)
			);
			ctx.closePath();
			ctx.fill();
		});
		ctx.restore();
	}

	private drawDoubleArrowhead(
		ctx: CanvasRenderingContext2D,
		start: Point,
		end: Point,
		arrowWidth: number
	): void {
		const angle = Math.atan2(end.y - start.y, end.x - start.x);

		// End arrowhead
		ctx.beginPath();
		ctx.moveTo(end.x, end.y);
		ctx.lineTo(
			end.x - arrowWidth * Math.cos(angle - Math.PI / 6),
			end.y - arrowWidth * Math.sin(angle - Math.PI / 6)
		);
		ctx.lineTo(
			end.x - arrowWidth * Math.cos(angle + Math.PI / 6),
			end.y - arrowWidth * Math.sin(angle + Math.PI / 6)
		);
		ctx.closePath();
		ctx.fill();

		// Start arrowhead
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(
			start.x + arrowWidth * Math.cos(angle - Math.PI / 6),
			start.y + arrowWidth * Math.sin(angle - Math.PI / 6)
		);
		ctx.lineTo(
			start.x + arrowWidth * Math.cos(angle + Math.PI / 6),
			start.y + arrowWidth * Math.sin(angle + Math.PI / 6)
		);
		ctx.closePath();
		ctx.fill();
	}

	private getArrowStart(dir: { dx: number; dy: number }): Point {
		let x = this.x + this.w / 2;
		let y = this.y + this.h / 2;

		if (dir.dx > 0) x = this.x + this.w;
		if (dir.dx < 0) x = this.x;
		if (dir.dy > 0) y = this.y + this.h;
		if (dir.dy < 0) y = this.y;

		return { x, y };
	}

	protected drawLabels(
		ctx: CanvasRenderingContext2D,
		mode: KeyWatcherMode,
		arrowLength: number,
		arrowWidth: number,
		labelSize: number,
		labelPadding: number
	): void {
		ctx.save();
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const labelPositions = this.getLabelPositions(
			mode,
			arrowLength,
			arrowWidth,
			labelSize,
			labelPadding
		);

		labelPositions.forEach(({ x, y, label, description }) => {
			if (description) {
				ctx.fillStyle = 'steelblue';

				const textWidth = ctx.measureText(description).width + 20;
				ctx.beginPath();
				ctx.roundRect(x - textWidth / 2, y - labelSize / 2 + 30, textWidth, labelSize + 5, [4]);
				ctx.fill();
				// Draw text
				ctx.fillStyle = 'white';
				ctx.fillText(description, x, y + 35);
				// x += 	textWidth;
			}
			// Draw yellow background
			ctx.fillStyle = '#FFD54F';

			ctx.beginPath();
			ctx.roundRect(x - labelSize / 2, y - labelSize / 2, labelSize, labelSize, [4]);
			ctx.fill();
			// Draw text
			ctx.fillStyle = 'black';
			ctx.fillText(label, x, y + 1);
		});
		ctx.restore();
	}

	private getLabelPositions(
		mode: KeyWatcherMode,
		arrowLength: number,
		arrowWidth: number,
		labelSize: number,
		labelPadding: number
	): Array<{ x: number; y: number; label: string; description?: string }> {
		const centerX = this.x + this.w / 2;
		const centerY = this.y + this.h / 2;

		const diagonalOffsetLabel =
			Math.sqrt(2) * (arrowLength + arrowWidth + labelPadding + labelSize / 2);
		const extra = [];
		if (this.type === 'text') {
			extra.push({
				x: this.x - diagonalOffsetLabel * 0.7,
				y: this.y - diagonalOffsetLabel * 0.7,
				label: 'E',
				description: 'Edit'
			});
		}
		if (keyWatcherConfig.mode == KeyWatcherMode.SELECTION_MAGNET) {
			extra.push({
				x: this.x - diagonalOffsetLabel * 0.7,
				y: this.y - diagonalOffsetLabel * 0.7,
				label: 'M',
				description: 'Magnetize'
			});
		}

		switch (mode) {
			case KeyWatcherMode.SELECTION_TRANSLATION:
			case KeyWatcherMode.SELECTION_MAGNET:
				return [
					...extra,
					// Right
					{
						x: this.x + this.w + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						y: centerY,
						label: 'L'
					},
					// Left
					{
						x: this.x - arrowLength - arrowWidth - labelPadding - labelSize / 2,
						y: centerY,
						label: 'H'
					},
					// Top
					{
						x: centerX,
						y: this.y - arrowLength - arrowWidth - labelPadding - labelSize / 2,
						label: 'K'
					},
					// Bottom
					{
						x: centerX,
						y: this.y + this.h + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						label: 'J'
					}, // Bottom
					{
						x: centerX,
						y: this.y + this.h + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						label: 'J'
					}
				];
			case KeyWatcherMode.SELECTION_BORDER_WIDTH_AND_ROUNDNESS:
				return [
					// Right
					{
						x: this.x + this.w + arrowLength + arrowWidth + labelPadding + labelSize / 2 + 60,
						y: centerY,
						label: 'L',
						description: 'Border Roundness++'
					},
					// Left
					{
						x: this.x - arrowLength - arrowWidth - labelPadding - labelSize / 2 - 60,
						y: centerY,
						label: 'H',
						description: 'Border Roundness--'
					},
					// Top
					{
						x: centerX,
						y: this.y - arrowLength - arrowWidth - labelPadding - labelSize / 2 - 30,
						label: 'K',
						description: 'Border Width++'
					},
					// Bottom
					{
						x: centerX,
						y: this.y + this.h + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						label: 'J',
						description: 'Border Width--'
					}
				];
			case KeyWatcherMode.SELECTION_OPACITY:
				return [
					// Right
					{
						x: this.x + this.w + arrowLength + arrowWidth + labelPadding + labelSize / 2 + 30,
						y: centerY,
						label: 'L',
						description: 'Color 1 Opacity++'
					},
					// Left
					{
						x: this.x - arrowLength - arrowWidth - labelPadding - labelSize / 2 - 30,
						y: centerY,
						label: 'H',
						description: 'Color 1 Opacity--'
					},
					// Top
					{
						x: centerX,
						y: this.y - arrowLength - arrowWidth - labelPadding - labelSize / 2 - 30,
						label: 'K',
						description: 'Color 2 Opacity++'
					},
					// Bottom
					{
						x: centerX,
						y: this.y + this.h + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						label: 'J',
						description: 'Color 2 Opacity--'
					}
				];

			case KeyWatcherMode.SELECTION_SCALE:
				return [
					// Cardinal directions (same as MOVE)
					{
						x: this.x + this.w + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						y: centerY,
						label: 'L'
					},
					{
						x: this.x - arrowLength - arrowWidth - labelPadding - labelSize / 2,
						y: centerY,
						label: 'H'
					},
					{
						x: centerX,
						y: this.y - arrowLength - arrowWidth - labelPadding - labelSize / 2,
						label: 'K'
					},
					{
						x: centerX,
						y: this.y + this.h + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						label: 'J'
					}
					// Diagonal directions
					// {
					// 	x: this.x + this.w + diagonalOffset * 0.7,
					// 	y: this.y + this.h + diagonalOffset * 0.7,
					// 	label: 'BR'
					// },
					// {
					// 	x: this.x - diagonalOffset * 0.7,
					// 	y: this.y + this.h + diagonalOffset * 0.7,
					// 	label: 'BL'
					// },
					// {
					// 	x: this.x + this.w + diagonalOffset * 0.7,
					// 	y: this.y - diagonalOffset * 0.7,
					// 	label: 'TR'
					// },
					// {
					// 	x: this.x - diagonalOffset * 0.7,
					// 	y: this.y - diagonalOffset * 0.7,
					// 	label: 'TL'
					// }
				];

			case KeyWatcherMode.SELECTION_ROTATE:
				return [
					{
						x: this.x + this.w + arrowLength + arrowWidth + labelPadding + labelSize / 2,
						y: centerY,
						label: 'L'
					},
					{
						x: this.x - arrowLength - arrowWidth - labelPadding - labelSize / 2,
						y: centerY,
						label: 'H'
					}
				];

			default:
				return [];
		}
	}

	private drawMagnets(ctx: CanvasRenderingContext2D, size: number): void {
		const magnetPoints = [
			// Top magnet
			{
				x: this.x + this.w / 2,
				y: this.y - 2 * size,
				direction: 'N'
			},
			// Right magnet
			{
				x: this.x + this.w + 2 * size,
				y: this.y + this.h / 2,
				direction: 'E'
			},
			// Bottom magnet
			{
				x: this.x + this.w / 2,
				y: this.y + this.h + 2 * size,
				direction: 'S'
			},
			// Left magnet
			{
				x: this.x - 2 * size,
				y: this.y + this.h / 2,
				direction: 'W'
			}
		];

		magnetPoints.forEach((point) => {
			ctx.save();
			ctx.fillStyle = this.strokeStyle;
			ctx.strokeStyle = this.strokeStyle;
			ctx.lineWidth = 2;
			ctx.translate(point.x, point.y);

			// Rotate based on direction
			switch (point.direction) {
				case 'E':
					ctx.rotate(Math.PI / 2);
					break;
				case 'S':
					ctx.rotate(Math.PI);
					break;
				case 'W':
					ctx.rotate(-Math.PI / 2);
					break;
				case 'N':
					ctx.rotate(2 * Math.PI);
					break;
			}

			const magnetSize = size * 1.7;

			// Draw horseshoe shape - pointing outward
			ctx.beginPath();

			// Draw the vertical lines
			const height = magnetSize;
			const width = magnetSize * 0.8;
			ctx.moveTo(-width / 2, 0);
			ctx.lineTo(-width / 2, height);
			ctx.moveTo(width / 2, 0);
			ctx.lineTo(width / 2, height);

			// Draw the connecting curve
			ctx.arc(0, height, width / 2, 0, Math.PI, true);
			ctx.stroke();

			// Draw lightning bolt
			const boltSize = magnetSize * 0.4;
			ctx.beginPath();
			ctx.moveTo(-boltSize / 4, -boltSize);
			ctx.lineTo(boltSize / 4, -boltSize / 2);
			ctx.lineTo(-boltSize / 4, -boltSize / 4);
			ctx.lineTo(boltSize / 4, 0);
			ctx.stroke();

			ctx.restore();
		});
	}

	clone(): Shape {
		return new ShapeBasic(this.x, this.y, this.z, this.w, this.h);
	}

	rotate(angle: number): void {
		if (this.magnetizedChildren.length == 0) {
			this.r += angle;
		} else {
			this.mR += angle;
		}
	}

	round = (num: number, decimals = 2) => {
		const factor = Math.pow(10, decimals);
		return Math.round(num * factor) / factor;
	};

	scale(scaleWidth: number, scaleHeight: number, isMagnetic: boolean = false): void {
		if (this.type == 'circle') {
			this.borderRoundness = this.w / 2;
		}
		if (this.magnetizedChildren.length == 0) {
			this.w += scaleWidth;
			this.h += scaleHeight;

			if (this.w <= 0) {
				this.w = 1;
			}
			if (this.h <= 0) {
				this.h = 1;
			}
		} else {
			// 			if (scaleWidth == 0) {
			// 				scaleWidth = scaleHeight;
			// 			}
			// 			if (scaleHeight == 0) {
			// 				scaleHeight = scaleWidth;
			// 			}
			// 			// const objects = [
			// 			// 	{ x: 100, y: 100, width: 20, height: 20 },
			// 			// 	{ x: 150, y: 120, width: 30, height: 15 },
			// 			// 	{ x: 80, y: 90, width: 25, height: 25 }
			// 			// ];
			// 			const objects = [this, ...this.magnetizedChildren];
			// 			// Find group center
			// 			const center = {
			// 				x: objects.reduce((sum, obj) => sum + obj.x, 0) / objects.length,
			// 				y: objects.reduce((sum, obj) => sum + obj.y, 0) / objects.length
			// 			};
			//
			// 			// Scale factor
			// 			const scale = (100 + scaleWidth)/100;
			//
			// // Transform all objects relative to center
			// 			// Multiply by 100 to work with integers, then divide at the end
			// 			const transformedObjects = objects.map(obj => {
			// 				const x = Math.round((center.x + (obj.x - center.x) * scale) * 100) / 100;
			// 				const y = Math.round((center.y + (obj.y - center.y) * scale) * 100) / 100;
			// 				return {
			// 					x,
			// 					y,
			// 					width: Math.round(obj.w * scale * 100) / 100,
			// 					height: Math.round(obj.h * scale * 100) / 100
			// 				};
			// 			});
			//
			// 			this.x = transformedObjects[0].x;
			// 			this.y = transformedObjects[0].y;
			// 			this.w = transformedObjects[0].width;
			// 			this.h = transformedObjects[0].height;
			//
			// 			this.magnetizedChildren[0].x = transformedObjects[1].x;
			// 			this.magnetizedChildren[0].y = transformedObjects[1].y;
			// 			this.magnetizedChildren[0].w = transformedObjects[1].width;
			// 			this.magnetizedChildren[0].h = transformedObjects[1].height;
			//
			// 			this.magnetizedChildren[1].x = transformedObjects[2].x;
			// 			this.magnetizedChildren[1].y = transformedObjects[2].y;
			// 			this.magnetizedChildren[1].w = transformedObjects[2].width;
			// 			this.magnetizedChildren[1].h = transformedObjects[2].height;
			//
			//
			// 			return;
			if (scaleWidth == 0) {
				scaleWidth = scaleHeight;
			}
			if (scaleHeight == 0) {
				scaleHeight = scaleWidth;
			}
			this.mW += scaleWidth;
			this.mH += scaleHeight;

			if (this.mW <= 0) {
				this.mH = 1;
			}
			if (this.mH <= 0) {
				this.mH = 1;
			}
			// this.magnetizedChildren.forEach(child => child.scale(scaleWidth, scaleHeight, true));
		}
	}

	translate(x: number, y: number): void {
		this.x += x;
		this.y += y;
		this.magnetizedChildren.forEach((item) => {
			item.translate(x, y);
		});
	}

	magnetize(shape: Shape, multiplier: number, mode: KeyWatcherMode): void {
		if (shape === this) {
			return;
		}
		if (mode == KeyWatcherMode.SELECTION_MAGNET_LEFT) {
			shape.x = this.x - shape.w - multiplier;
			shape.y = this.y;
		}

		if (mode == KeyWatcherMode.SELECTION_MAGNET_RIGHT) {
			shape.x = this.x + this.w + multiplier;
			shape.y = this.y;
		}

		if (mode == KeyWatcherMode.SELECTION_MAGNET_TOP) {
			shape.x = this.x;
			shape.y = this.y - shape.h - multiplier;
		}

		if (mode == KeyWatcherMode.SELECTION_MAGNET_BOTTOM) {
			shape.x = this.x;
			shape.y = this.y + this.h + multiplier;
		}

		if (this.magnetizedParents.length > 0) {
			this.magnetizedParents[0].magnetizedChildren.push(shape);
			shape.magnetizedParents.push(this.magnetizedParents[0]);
		} else {
			this.magnetizedChildren.push(shape);
			shape.magnetizedParents.push(this);
		}
	}

	protected applyOpacity(color: string, opacity: number): string {
		const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		if (!rgbMatch) {
			return color;
		}

		const alphaValue = opacity / 100;

		return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alphaValue})`;
	}

	adjustBorderRoundness(incrementValue: number, magnetize: boolean): void {
		this.borderRoundness += incrementValue;
		if (magnetize) {
			this.magnetizedChildren.forEach((item) => {
				item.adjustBorderRoundness(incrementValue, false);
			});
		}
		if (this.borderRoundness < 0) {
			this.borderRoundness = 0;
		}

		if (this.borderRoundness > this.w / 2) {
			this.borderRoundness = this.w / 2;
		}
	}

	adjustBorderWidth(incrementValue: number, magnetize: boolean): void {
		this.lineWidth += incrementValue;
		if (magnetize) {
			this.magnetizedChildren.forEach((item) => {
				item.adjustBorderWidth(incrementValue, false);
			});
		}
		// if (this.lineWidth < 0) {
		// 	this.lineWidth = 0;
		// }
	}

	adjustColor1(color: string, magnetize: boolean): void {
		console.log(color,magnetize);
	}

	adjustColor1Opacity(incrementValue: number, magnetize: boolean): void {
		if (this.magnetizedChildren.length == 0 || !magnetize) {
			this.opacityColor1 += incrementValue;
		}

		if (this.opacityColor1 <= 0) {
			this.opacityColor1 = 1;
		}
		if (this.opacityColor1 > 100) {
			this.opacityColor1 = 100;
		}
	}

	adjustColor2(color: string, magnetize: boolean): void {
		console.log(color, magnetize);
	}

	adjustColor2Opacity(incrementValue: number, magnetize: boolean): void {
		if (this.magnetizedChildren.length == 0 || !magnetize) {
			this.opacityColor2 += incrementValue;
		}

		if (this.opacityColor2 <= 0) {
			this.opacityColor2 = 1;
		}
		if (this.opacityColor2 > 100) {
			this.opacityColor2 = 100;
		}
	}

}
