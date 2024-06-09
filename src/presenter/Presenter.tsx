import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Button } from 'antd';
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
		<Spin spinning={loading}>
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

		</Spin>
	);
};

export default Presenter;
