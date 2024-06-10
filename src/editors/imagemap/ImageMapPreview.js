import { Button } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Canvas from '../../canvas/Canvas';
import Icon from '../../components/icon/Icon';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';

const ImageMapPreview = (props) => {
	ImageMapPreview.propTypes = {
		preview: PropTypes.bool,
		onChangePreview: PropTypes.func,
		onTooltip: PropTypes.func,
		onAction: PropTypes.func,
	};

	const { getObjects } = useContext(LocalStorageContext);
	const { onChangePreview, onTooltip, onClick, preview } = props;
	const previewClassName = classnames('rde-preview', { preview });
	return (
		preview && (
			<div className={previewClassName}>
				<div
					style={{
						overflow: 'hidden',
						display: 'flex',
						flex: '1',
						height: '100%',
					}}
				>
					<Canvas
						editable={false}
						className="rde-canvas"
						canvasOption={{
							perPixelTargetFind: true,
						}}
						keyEvent={{
							grab: false,
						}}
						onLoad={handler => handler.importJSON(getObjects())}
						onTooltip={onTooltip}
						onClick={onClick}
						maxZoom={500}
					/>
					<Button className="rde-action-btn rde-preview-close-btn" onClick={onChangePreview}>
						<Icon name="times" size={1.5} />
					</Button>
				</div>
			</div>
		)
	);
}

export default ImageMapPreview;
