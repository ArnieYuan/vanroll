import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Canvas, CanvasInstance } from '../canvas';
import Icon from '../components/icon/Icon';
import { LocalStorageContext } from '../contexts/LocalStorageContext';

export type PresenterProps = {
};

const Presenter = (props) => {
	const { getObjects } = useContext(LocalStorageContext);
	const [loading, setLoading] = useState(false);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const navigate = useNavigate();
	const canvasRef = useRef<CanvasInstance>();
	const handleLoad = () => {
		if (!getObjects) {
			return;
		}
		setLoading(true);
		canvasRef.current?.handler.importJSON(getObjects());
		if (canvasRef.current) {
			const canvas = canvasRef.current.handler.canvas;
			const workarea = canvasRef.current.handler.workarea;
			let scale = canvas.getWidth() / workarea.width;
			const scaleY = canvas.getHeight() / workarea.height;
			if (scaleY < scale) {
				scale = scaleY;
			}
			const videoWidth = workarea.width * scale;
			const videoHeight = workarea.height * scale;
			canvasRef.current.backgroundVideoElement.style.left = (canvas.getWidth() - videoWidth) / 2 + 'px';
			navigator.mediaDevices.getUserMedia(
				{ video: { height: videoHeight, width: videoWidth } }
			).then(
				(stream) => {
					setStream(stream);
					workarea.set({ visible: false });
					canvasRef.current.backgroundVideoElement.srcObject = stream;
					canvasRef.current.canvas.renderAll();
				});
		}


		setLoading(false);
	};
	const exit = () => {
		if (stream) {
			stream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		navigate('/');
	};
	return (
		<div style={{
			overflow: 'hidden',
			display: 'flex',
			flex: '1',
			height: '100%',
		}} >
			<Canvas
				ref={canvasRef}
				editable={false}
				className="rde-canvas"
				canvasOption={{
					perPixelTargetFind: true,
				}}
				workareaOption={{ backgroundColor: 'transparent' }}
				keyEvent={{
					grab: false,
				}}
				onLoad={handleLoad}
				maxZoom={500}
			/>
			<Button className="rde-action-btn rde-preview-close-btn" onClick={exit}>
				<Icon name="times" size={1.5} />
			</Button>
		</div>
	);
};

export default Presenter;
