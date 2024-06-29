import React from 'react';
import { Form, Row, Col, Button, Select, Switch, Slider, InputNumber } from 'antd';
import i18n from 'i18next';

import ColorPicker from '../../../components/common/ColorPicker';
import Icon from '../../../components/icon/Icon';

const AnimationForm = (canvasRef, form, animation) => {
	if (!animation) {
		return null;
	}
	const type = animation.type || 'none';

	const initialAnimation = {
		angle: animation.angle || 360,
		autoplay: animation.autoplay || true,
		bounce: animation.bounce || 'hotizontal',
		delay: animation.delay || 100,
		duration: animation.duration || 1000,
		loop: animation.loop || true,
		opacity: animation.opacity || 0,
		offset: animation.offset || 1,
		scale: animation.scale || 2,
		shake: animation.shake || 'hotizontal',
		type: animation.type || 'none',
		value: animation.value || 1,
	}; // as AnimeParams;

	const getComponentType = (type) => {
		let component;
		if (type === 'fade') {
			component = (
				<Form.Item
					name='opacity'
					label={i18n.t('common.opacity')}
					rules={[
						{
							type: 'number',
							min: 0,
							max: 1,
						},
					]} colon={false}>
					<Slider min={0} max={1} step={0.1} />
				</Form.Item>
			);
		} else if (type === 'bounce') {
			component = (
				<React.Fragment>
					<Form.Item
						name='bounce'
						label={i18n.t('imagemap.animation.bounce-type')}
						colon={false}>
						<Select>
							<Select.Option value="hotizontal">Horizontal</Select.Option>
							<Select.Option value="vertical">Vertical</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						name='offset'
						label={i18n.t('common.offset')}
						rules={[
							{
								type: 'number',
								min: 1,
								max: 10,
							},
						]}
						colon={false}>
						<Slider min={1} max={10} step={1} />
					</Form.Item>
				</React.Fragment>
			);
		} else if (type === 'shake') {
			component = (
				<React.Fragment>
					<Form.Item name='shake' label={i18n.t('imagemap.animation.shake-type')} colon={false}>
						<Select>
							<Select.Option value="hotizontal">{i18n.t('common.horizontal')}</Select.Option>
							<Select.Option value="vertical">{i18n.t('common.vertical')}</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						name='offset'
						label={i18n.t('common.offset')}
						rules={[
							{
								type: 'number',
								min: 1,
								max: 10,
							},
						]}
						colon={false}>
						<Slider min={1} max={10} step={1} />
					</Form.Item>
				</React.Fragment>
			);
		} else if (type === 'scaling') {
			component = (
				<Form.Item
					name='scale'
					label={i18n.t('imagemap.animation.scaling')}
					rules={[
						{
							type: 'number',
							min: 1,
							max: 5,
						},
					]}
					colon={false}>
					<Slider min={1} max={5} step={0.1} />
				</Form.Item>
			);
		} else if (type === 'rotation') {
			component = (
				<Form.Item
					name='angle'
					label={i18n.t('common.angle')}
					rules={[
						{
							type: 'number',
							min: 0,
							max: 360,
						},
					]}
					colon={false}>
					<Slider min={0} max={360} />
				</Form.Item>
			);
		} else if (type === 'flash') {
			component = (
				<Row>
					<Col span={12}>
						<Form.Item name='fill' label={i18n.t('imagemap.style.fill-color')} colon={false}>
							<ColorPicker />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='stroke' label={i18n.t('imagemap.style.stroke-color')} colon={false}>
							<ColorPicker />
						</Form.Item>
					</Col>
				</Row>
			);
		} else {
			component = (
				<Row>
					<Col span={12}>
						<Form.Item
							name='value'
							label={i18n.t('common.value')}
							rules={[
								{
									type: 'number',
									min: 1,
									max: 10,
								},
							]}
							colon={false}>
							<InputNumber min={1} max={10} />
						</Form.Item>
					</Col>
				</Row>
			);
		}
		return component;
	};
	return (
		<Form form={form} initialValues={initialAnimation}>
			<Form.Item name='type' label={i18n.t('imagemap.animation.animation-type')} colon={false}>
				<Select>
					<Select.Option value="none">{i18n.t('imagemap.animation.none')}</Select.Option>
					<Select.Option value="fade">{i18n.t('imagemap.animation.fade')}</Select.Option>
					<Select.Option value="bounce">{i18n.t('imagemap.animation.bounce')}</Select.Option>
					<Select.Option value="shake">{i18n.t('imagemap.animation.shake')}</Select.Option>
					<Select.Option value="scaling">{i18n.t('imagemap.animation.scaling')}</Select.Option>
					<Select.Option value="rotation">{i18n.t('imagemap.animation.rotation')}</Select.Option>
					<Select.Option value="flash">{i18n.t('imagemap.animation.flash')}</Select.Option>
				</Select>
			</Form.Item>
			{type === 'none' ? null : (
				<React.Fragment>
					<Row>
						<Col span={12}>
							<Form.Item name='autoplay'
								label={i18n.t('imagemap.animation.auto-play')}
								rules={[
									{
										type: 'boolean',
									},
								]}
								colon={false}>
								<Switch size="small" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='loop' label={i18n.t('common.loop')}
								rules={[
									{
										type: 'boolean',
									},
								]}
								colon={false}>
								<Switch size="small" />
							</Form.Item>
						</Col>
					</Row>
					{type !== 'shake' ? (
						<Row>
							<Col span={12}>
								<Form.Item name='delay' label={i18n.t('common.delay')}
									rules={[
										{
											type: 'number',
											min: 0,
											max: 5000,
										},
									]}
									colon={false}>
									<Slider min={0} max={5000} step={100} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name='duration' label={i18n.t('common.duration')}
									rules={[
										{
											type: 'number',
											min: 0,
											max: 5000,
										},
									]}
									colon={false}>
									<Slider min={100} max={5000} step={100} />
								</Form.Item>
							</Col>
						</Row>
					) : null}
					{getComponentType(type)}
					<Form.Item label={i18n.t('imagemap.animation.playback')} colon={false}>
						<Row>
							<Col span={8}>
								<Button
									block
									size="small"
									onClick={() => {
										canvasRef.handler.animationHandler.play(data.id);
									}}
								>
									<Icon name="play" style={{ marginRight: 8 }} />
									{i18n.t('action.start')}
								</Button>
							</Col>
							<Col span={8}>
								<Button
									block
									size="small"
									onClick={() => {
										canvasRef.handler.animationHandler.pause(data.id);
									}}
								>
									<Icon name="pause" style={{ marginRight: 8 }} />
									{i18n.t('action.pause')}
								</Button>
							</Col>
							<Col span={8}>
								<Button
									block
									size="small"
									onClick={() => {
										canvasRef.handler.animationHandler.stop(data.id);
									}}
								>
									<Icon name="stop" style={{ marginRight: 8 }} />
									{i18n.t('action.stop')}
								</Button>
							</Col>
						</Row>
					</Form.Item>
				</React.Fragment>
			)}
		</Form>
	);
};

