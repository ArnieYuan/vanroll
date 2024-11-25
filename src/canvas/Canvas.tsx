import { fabric } from 'fabric';
import React, { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { v4 as uuid } from 'uuid';
import { defaults } from './constants';
import Handler, { HandlerOptions } from './handlers/Handler';
import './styles/canvas.less';
import './styles/contextmenu.less';
import './styles/fabricjs.less';
import './styles/tooltip.less';
import { FabricCanvas } from './utils';

export interface CanvasInstance {
	handler: Handler;
	canvas: FabricCanvas;
	container: HTMLDivElement;
	backgroundVideoElement: HTMLVideoElement;
}

export type CanvasProps = HandlerOptions & {
	responsive?: boolean;
	style?: React.CSSProperties;
};

const Canvas: React.FC<CanvasProps> = React.forwardRef<CanvasInstance, CanvasProps>(({
	editable = true,
	zoomEnabled = true,
	minZoom = 30,
	maxZoom = 300,
	responsive = true,
	width = 0,
	height = 0,
	canvasOption,
	keyEvent,
	fabricObjects,
	workareaOption,
	guidelineOption,
	objectOption,
	gridOption,
	propertiesToInclude,
	activeSelectionOption,
	...props
}, ref) => {
	const [id] = useState(uuid());
	const [loaded, setLoaded] = useState(false);
	const canvas = useRef<FabricCanvas>();
	const containerRef = useRef<HTMLDivElement>(null);
	const handler = useRef<Handler>();
	const backgroundVideoElement = useRef<HTMLVideoElement>();
	const resizeObserver = useRef<ResizeObserver>();

	React.useImperativeHandle(ref, () => ({
		handler: handler.current,
		canvas: canvas.current,
		container: containerRef.current,
		backgroundVideoElement: backgroundVideoElement.current,
	}));

	useEffect(() => {
		const { editable, canvasOption, width, height, responsive, ...other } = props;
		const mergedCanvasOption = {
			...defaults.canvasOption,
			...canvasOption,
			width,
			height,
			selection: (typeof canvasOption?.selection !== 'undefined' && canvasOption?.selection) || editable,
		};
		canvas.current = new fabric.Canvas(`canvas_${id}`, mergedCanvasOption);
		canvas.current.setBackgroundColor(
			mergedCanvasOption.backgroundColor,
			canvas.current?.renderAll.bind(canvas.current));
		canvas.current.renderAll();
		backgroundVideoElement.current = fabric.util.makeElement('video', {
			id: 'bg_' + id,
			autoplay: true,
			muted: false,
			loop: false,
			preload: 'none',
			playsinline: true,
			style: `position: absolute;`
		}) as HTMLVideoElement;
		canvas.current.wrapperEl.prepend(backgroundVideoElement.current);
		handler.current = new Handler({
			id,
			width,
			height,
			editable,
			canvas: canvas.current,
			container: containerRef.current,
			canvasOption: mergedCanvasOption,
			...other,
		});
		if (responsive) {
			createObserver();
		} else {
			handleLoad();
		}
		return () => {
			destroyObserver();
			handler.current?.destroy();
		};
	}, []);

	useEffect(() => {
		if (props.width !== width || props.height !== height) {
			handler.current?.eventHandler.resize(props.width, props.height);
		}
		if (props.editable !== editable) {
			handler.current.editable = props.editable;
		}
		if (props.responsive !== responsive) {
			if (!props.responsive) {
				destroyObserver();
			} else {
				destroyObserver();
				createObserver();
			}
		}
		if (JSON.stringify(props.canvasOption) !== JSON.stringify(canvasOption)) {
			handler.current.setCanvasOption(props.canvasOption);
		}
		if (JSON.stringify(props.keyEvent) !== JSON.stringify(keyEvent)) {
			handler.current.setKeyEvent(props.keyEvent);
		}
		if (JSON.stringify(props.fabricObjects) !== JSON.stringify(fabricObjects)) {
			handler.current.setFabricObjects(props.fabricObjects);
		}
		if (JSON.stringify(props.workareaOption) !== JSON.stringify(workareaOption)) {
			handler.current.setWorkareaOption(workareaOption);
		}
		if (JSON.stringify(props.guidelineOption) !== JSON.stringify(guidelineOption)) {
		    handler.current.setGuidelineOption(guidelineOption);
		}
		if (JSON.stringify(props.objectOption) !== JSON.stringify(objectOption)) {
			handler.current.setObjectOption(props.objectOption);
		}
		if (JSON.stringify(props.gridOption) !== JSON.stringify(gridOption)) {
			handler.current.setGridOption(props.gridOption);
		}
		if (JSON.stringify(props.propertiesToInclude) !== JSON.stringify(propertiesToInclude)) {
			handler.current.setPropertiesToInclude(props.propertiesToInclude);
		}
		if (JSON.stringify(props.activeSelectionOption) !== JSON.stringify(activeSelectionOption)) {
			handler.current.setActiveSelectionOption(props.activeSelectionOption);
		}
	}, [props]);

	const createObserver = () => {
		resizeObserver.current = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const { width = 0, height = 0 } = (entries[0] && entries[0].contentRect) || {};
			handler.current?.eventHandler.resize(width, height);
			if (!loaded) {
				handleLoad();
			}
		});
		resizeObserver.current.observe(containerRef.current);
	};

	const destroyObserver = () => {
		resizeObserver.current?.disconnect();
		resizeObserver.current = null;
	};

	const handleLoad = () => {
		setLoaded(true);
		if (props.onLoad) {
			props.onLoad(handler.current, canvas.current);
		}
	};

	return (
		<div
			ref={containerRef}
			id={id}
			className="rde-canvas"
			style={{ width: '100%', height: '100%', ...props.style }}
		>
			<canvas id={`canvas_${id}`} />
		</div>
	);
});

export default Canvas;
