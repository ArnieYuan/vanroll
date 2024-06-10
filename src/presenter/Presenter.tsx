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
	const navigate = useNavigate();
	const canvasRef = useRef<CanvasInstance>();
	const handleLoad = () => {
		if (!getObjects) {
			return;
		}
		setLoading(true);
		canvasRef.current?.handler.importJSON(getObjects());
		setLoading(false);
	};
	const exit = () => {
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
