import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Form } from 'antd';
import i18n from 'i18next';

import Canvas from '../../../canvas/Canvas';
import AnimationProperty from '../properties/AnimationProperty';

const initialAnimation = {
	type: 'none',
	loop: true,
	autoplay: true,
	delay: 100,
	duration: 1000,
}; // as AnimeParams;

const AnimationModal = (props) => {
	AnimationModal.propTypes = {
		visible: PropTypes.bool,
		animation: PropTypes.object,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
	};

	const { visible, animation, onChange } = props;
	const [form] = Form.useForm();
	const [width, setWidth] = useState(150);
	const [height, setHeight] = useState(150);

	const containerRef = useRef(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		waitForContainerRender(containerRef);
	}, []);

	useEffect(() => {
		waitForCanvasRender(canvasRef, animation);
		form.resetFields();
	}, [animation]);

	const waitForCanvasRender = (canvas, animation) => {
		setTimeout(() => {
			if (!canvas) {
				waitForCanvasRender(canvasRef, animation);
				return;
			}
			canvas.handlers.setById('animations', 'animation', animation);
		}, 5);
	};

	const waitForContainerRender = container => {
		setTimeout(() => {
			if (!container) {
				waitForContainerRender(containerRef);
				return;
			}
			setWidth(container.clientWidth);
			setHeight(container.clientHeight);
			const option = {
				type: 'i-text',
				text: '\uf3c5',
				fontFamily: 'Font Awesome 5 Free',
				fontWeight: 900,
				fontSize: 60,
				width: 30,
				height: 30,
				editable: false,
				name: 'New marker',
				tooltip: {
					enabled: false,
				},
				left: 200,
				top: 50,
				id: 'animations',
				fill: 'rgba(0, 0, 0, 1)',
				stroke: 'rgba(255, 255, 255, 0)',
			};
			canvasRef.handler.add(option);
		}, 5);
	};

	const handleFormSubmit = () => {
		form.validateFields()
		  .then((values) => {
			// Handle form submission logic with values
			onOk(values);
		  })
		  .catch((errorInfo) => {
			console.error('Validation failed:', errorInfo);
		  });
	  };

	return (
		<Modal onOk={handleFormSubmit} onCancel={onCancel} open={visible}>
			<Form form={form}>
				<Form.Item
					label={i18n.t('common.title')}
					required
					colon={false}
					hasFeedback
				>
					<Input
						value={animation.title}
						onChange={e => {
							onChange(
								null,
								{ animation: { title: e.target.value } },
								{ animation: { ...animation, title: e.target.value } },
							);
						}}
					/>
				</Form.Item>
				{AnimationProperty.render(canvasRef, form, { animation, id: 'animations' })}
				<div ref={containerRef}>
					<Canvas
						ref={canvasRef}
						editable={false}
						canvasOption={{ width, height, backgroundColor: '#f3f3f3' }}
						workareaOption={{ backgroundColor: 'transparent' }}
					/>
				</div>
			</Form>
		</Modal>
	);
}

export default AnimationModal;