import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse, List, Form } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';
import { Flex } from '../../../components/flex';

const { Panel } = Collapse;

const NodeProperties = (props) => {
	NodeProperties.propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
	};

	const { canvasRef, selectedItem, onChange } = this.props;
	if (!canvasRef) {
		return null;
	}

	const [form] = Form.useForm();
	useEffect(() => {
		if (props.selectedItem !== undefined) {
			form.resetFields();
		}
	}, [props.selectedItem]);
	const initialValues = {
		'link.enabled': selectedItem.link.enabled,
		'link.state': selectedItem.link.state || 'current',
		'link.url': selectedItem.link.url || '',
		'shadow.blur': selectedItem.shadow.blur || 15,
		'shadow.color': selectedItem.shadow.color || 'rgba(0, 0, 0, 0)',
		'shadow.enabled': 'enabled',
		'shadow.offsetX': selectedItem.shadow.offsetX || 10,
		'shadow.offsetY': selectedItem.shadow.offsetY || 10,
		'tooltip.enabled': selectedItem.tooltip.enabled,
		angle: selectedItem.angle,
		file: workarea.file,
		fill: selectedItem.fill || 'rgba(0, 0, 0, 1)',
		height: selectedItem.height * selectedItem.scaleY,
		icon: selectedItem.icon,
		imageLoadType: workarea.imageLoadType || 'file',
		left: selectedItem.left,
		locked: selectedItem.locked,
		name: selectedItem.name || '',
		opacity: selectedItem.opacity || 1,
		rx: selectedItem.rx || 0,
		ry: selectedItem.ry || 0,
		src: workarea.src,
		stroke: selectedItem.stroke || 'rgba(255, 255, 255, 0)',
		strokeWidth: selectedItem.strokeWidth || 1,
		top: selectedItem.top,
		visible: selectedItem.visible,
		width: selectedItem.width * selectedItem.scaleX,
	};
	const onValuesChange = (changedValues, allValues) => {
		onChange(selectedItem, changedValues, allValues);
	}
	const showArrow = false;
	return (
		<Scrollbar>
			<Form form={form} layout="horizontal" colon={false} initialValues={initialValues} onValuesChange={onValuesChange}>
				<Collapse bordered={false}>
					{selectedItem && PropertyDefinition[selectedItem.type] ? (
						Object.keys(PropertyDefinition[selectedItem.type]).map(key => {
							return (
								<Panel
									key={key}
									header={PropertyDefinition[selectedItem.type][key].title}
									showArrow={showArrow}
								>
									{PropertyDefinition[selectedItem.type][key].component.render(
										canvasRef,
										form,
										selectedItem,
									)}
								</Panel>
							);
						})
					) : (
						<Flex
							justifyContent="center"
							alignItems="center"
							style={{
								width: '100%',
								height: '100%',
								color: 'rgba(0, 0, 0, 0.45)',
								fontSie: 16,
								padding: 16,
							}}
						>
							<List />
						</Flex>
					)}
				</Collapse>
			</Form>
		</Scrollbar>
	);
}

export default NodeProperties;
