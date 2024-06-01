import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { ProductOutlined, PictureOutlined, PlaySquareOutlined, FormatPainterOutlined} from '@ant-design/icons';
import classnames from 'classnames';

import NodeProperties from './properties/NodeProperties';
import MapProperties from './properties/MapProperties';
import Animations from './animations/Animations';
import Styles from './styles/Styles';
import DataSources from './datasources/DataSources';
import CommonButton from '../../components/common/CommonButton';

const ImageMapConfigurations = (props) => {
	ImageMapConfigurations.propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
		onChange: PropTypes.func,
		onChangeAnimations: PropTypes.func,
		onChangeStyles: PropTypes.func,
		onChangeDataSources: PropTypes.func,
		animations: PropTypes.array,
		styles: PropTypes.array,
		dataSources: PropTypes.array,
	};

	const [activeKey, setActiveKey] = useState('map');
	const [collapse, setCollapse] = useState(false);

	const handlers = {
		onChangeTab: activeKey => {
			setActiveKey(activeKey);
		},
		onCollapse: () => {
			setCollapse(!collapse);
		},
	};

	const {
		onChange,
		selectedItem,
		canvasRef,
		animations,
		styles,
		dataSources,
		onChangeAnimations,
		onChangeStyles,
		onChangeDataSources,
	} = props;

	// TODO: fix the too many rerenders error with the commented code.
	// if (selectedItem) {
	// 	setActiveKey('node');
	// }

	const className = classnames('rde-editor-configurations', {
		minimize: collapse,
	});
	const items = [
		{
			label: <ProductOutlined />,
			key: 'map', children: <MapProperties onChange={onChange} canvasRef={canvasRef} />
		},
		{
			label: <PictureOutlined />,
			key: 'node',
			chilren: <NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
		},
		{
			label: <PlaySquareOutlined />,
			key: 'animations',
			children: <Animations animations={animations} onChangeAnimations={onChangeAnimations} />
		},
		{
			label: <FormatPainterOutlined />,
			key: 'styles',
			children: <Styles styles={styles} onChangeStyles={onChangeStyles} />
		},
		// { label: <Icon name="table" />, key: 'datasources', children: <DataSources ref={(c) => { this.dataSourcesRef = c; }} dataSources={dataSources} onChangeDataSources={onChangeDataSources} /> },
	];
	return (
		<div className={className}>
			<CommonButton
				className="rde-action-btn"
				shape="circle"
				icon={collapse ? 'angle-double-left' : 'angle-double-right'}
				onClick={handlers.onCollapse}
				style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}
			/>
			<Tabs
				items={items}
				tabPosition="right"
				style={{ height: '100%' }}
				defaultActiveKey={activeKey}
				onChange={handlers.onChangeTab}
				tabBarStyle={{ marginTop: 60 }}
			/>
		</div>
	);
}

export default ImageMapConfigurations;
