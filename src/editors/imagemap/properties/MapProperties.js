import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Form } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';

const { Panel } = Collapse;

const MapProperties = (props) => {
	MapProperties.propTypes = {
		canvasRef: PropTypes.any,
		onChange: PropTypes.func,
		selectedItem: PropTypes.any,
	};

	const [form] = Form.useForm();
	const { canvasRef, onChange, selectedItem } = props;

	if (!canvasRef) {
		return null;
	}
	const workarea = canvasRef.handler.workarea;
	const showArrow = false;
	const initialValues = {
		name: workarea.name || '',
		width: workarea.width * workarea.scaleX,
		height: workarea.height * workarea.scaleY,
		imageLoadType: workarea.imageLoadType || 'file',
		file: workarea.file,
		src: workarea.src
	};
	const onValuesChange = (changedValues, allValues) => {
		onChange(selectedItem, changedValues, { workarea: allValues });
	};

	return (
		<Scrollbar>
			<Form form={form} layout="horizontal" initialValues={initialValues} onValuesChange={onValuesChange}>
				<Collapse bordered={false}>
					{Object.keys(PropertyDefinition.map).map(key => {
						return (
							<Panel key={key} header={PropertyDefinition.map[key].title} showArrow={showArrow}>
								{PropertyDefinition.map[key].component.render(
									canvasRef,
									form,
									workarea,
								)}
							</Panel>
						);
					})}
				</Collapse>
			</Form>
		</Scrollbar>
	);
}

export default MapProperties;
