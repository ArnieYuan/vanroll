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
		locked: selectedItem.locked,
		visible: selectedItem.visible,
		name: selectedItem.name || '',
		width: selectedItem.width * selectedItem.scaleX,
		height: selectedItem.height * selectedItem.scaleY,
		left: selectedItem.left,
		top: selectedItem.top,
		angle: selectedItem.angle,
		imageLoadType: workarea.imageLoadType || 'file',
		file: workarea.file,
		src: workarea.src
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
