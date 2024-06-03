import React from 'react';
import { Form, Input, Slider, Switch, Col, InputNumber, Row } from 'antd';
import i18n from 'i18next';
import { booleanRules, widthRules, heightRules, leftRules, topRules, angleRules } from './FormRules';

export default {
	render(canvasRef, form, data) {
		return (
			<React.Fragment>
				<Row>
					<Col span={12}>
						<Form.Item name='locked' label={i18n.t('common.locked')} rules={booleanRules} colon={false}>
							<Switch size="small" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='visible' label={i18n.t('common.visible')} rules={booleanRules} colon={false}>
							<Switch size="small" />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item name='name' label={i18n.t('common.name')} colon={false}>
					<Input />
				</Form.Item>
				<Row>
					<Col span={12}>
						<Form.Item name='width' label={i18n.t('common.width')} rules={widthRules} colon={false}>
							<InputNumber min={1} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='height' label={i18n.t('common.height')} rules={heightRules} colon={false}>
							<InputNumber min={1} />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Form.Item name='left' label={i18n.t('common.left')} rules={leftRules} colon={false}>
							<InputNumber />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='top' label={i18n.t('common.top')} rules={topRules} colon={false}>
							<InputNumber />
						</Form.Item>
					</Col>
				</Row>
				{data.superType === 'element' ? null : (
					<Form.Item name='angle' label={i18n.t('common.angle')} rules={angleRules} colon={false}>
						<Slider min={0} max={360} />
					</Form.Item>
				)}
			</React.Fragment>
		);
	},
};
