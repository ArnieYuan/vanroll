import { fabric } from 'fabric';

import { Handler } from '.';
import { WorkareaObject} from '../utils';
class WorkareaHandler {
	handler: Handler;

	constructor(handler: Handler) {
		this.handler = handler;
		this.initialize();
	}

	/**
	 * Initialize workarea
	 *
	 * @author salgum1114
	 */
	public initialize() {
		const { workareaOption } = this.handler;
		const image = new Image(workareaOption.width, workareaOption.height);
		image.width = workareaOption.width;
		image.height = workareaOption.height;
		this.handler.workarea = new fabric.Image(image, workareaOption) as WorkareaObject;
		this.handler.canvas.add(this.handler.workarea);
		this.handler.objects = this.handler.getObjects();
		this.handler.canvas.centerObject(this.handler.workarea);
		this.handler.canvas.renderAll();
	}

	/**
	 * Set the image on Workarea
	 * @param {string | File} source
	 * @returns
	 */
	setImage = async (source: string | File) => {
		const { canvas, workarea } = this.handler;
		const imageFromUrl = async (src: string) => {
			return new Promise<WorkareaObject>(resolve => {
				fabric.Image.fromURL(src, (img: any) => {
					let	width = workarea.width * workarea.scaleX;
					let	height = workarea.height * workarea.scaleY;
					let scaleX = 1;
					let scaleY = 1;
					if (img._element) {
						scaleX = width / img.width;
						scaleY = height / img.height;
						img.set({
							originX: 'left',
							originY: 'top',
							scaleX,
							scaleY,
						});
						workarea.set({
							...img,
							isElement: true,
							selectable: false,
						});
					} else {
						workarea.setElement(new Image());
						workarea.set({
							width,
							height,
							scaleX,
							scaleY,
							isElement: false,
							selectable: false,
						});
					}
					canvas.centerObject(workarea);
					const center = canvas.getCenter();
					const zoom = this.handler.canvas.getZoom();
					canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
					this.handler.zoomHandler.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
					canvas.renderAll();
					resolve(workarea);
				}, { crossOrigin: 'anonymous' });
			});
		};
		if (!source) {
			workarea.set({
				src: null,
				file: null,
			});
			return imageFromUrl(source as string);
		}
		if (source instanceof File) {
			return new Promise<WorkareaObject>(resolve => {
				const reader = new FileReader();
				reader.onload = () => {
					workarea.set({
						file: source,
					});
					imageFromUrl(reader.result as string).then(resolve);
				};
				reader.readAsDataURL(source);
			});
		} else {
			workarea.set({
				src: source,
			});
			return imageFromUrl(source);
		}
	};
}

export default WorkareaHandler;
