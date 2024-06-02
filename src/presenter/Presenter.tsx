import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { Canvas, FiberHandler } from '../canvas';
import { CanvasInstance } from '../canvas/Canvas';
import { Content } from '../components/layout';

const Presenter = () => {
	const canvasRef = useRef<CanvasInstance>();
	const handleLoad = () => {
		const fiberHandler = canvasRef.current?.handler.registerHandler('fiber', FiberHandler) as FiberHandler;
	};
	return (
		<Content>
			<Canvas
				ref={canvasRef}
				onLoad={handleLoad}
				activeSelectionOption={{ hasControls: false, hasBorders: false }}
				fabricObjects={{}}
			/>
		</Content>
	);
};

export default Presenter;
