import { fabric } from 'fabric';
import { parseGIF, decompressFrames } from 'gifuct-js';
import { FabricImage } from '../utils';

function readFileAsPromise(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			resolve(event.target.result as ArrayBuffer);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsArrayBuffer(file);
	});
}

async function loadGif(source?: File | string) {
	if (source instanceof File) {
		return readFileAsPromise(source);
	} else {
		const response = await fetch(source, {
			mode: 'cors',
		});
		return response.arrayBuffer();
	}
}

const Gif = fabric.util.createClass(fabric.Object, {
	type: 'gif',
	superType: 'image',
	initialize(options: FabricImage) {
		this.callSuper('initialize', options);
		const { src, file } = options;
		loadGif(src || file).then((arrayBuffer) => {
			this.gifData = parseGIF(arrayBuffer);
			this.frames = decompressFrames(this.gifData, true);
			this.width = this.frames[0].dims.width;
			this.height = this.frames[0].dims.height;
		});
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		if (this.frames) {
			const frame = this.frames[0];
			let imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
			imageData.data.set(frame.patch);
			ctx.putImageData(imageData, this.left, this.top);
		}
	},
});

Gif.fromObject = (options: any, callback: (obj: any) => any) => {
	return callback(new Gif(options));
};

// @ts-ignore
window.fabric.Gif = Gif;

export default Gif;
