import React from 'react';
import { Form, Input, Radio, Row, Col, InputNumber } from 'antd';
import i18n from 'i18next';

export default {
	render(canvasRef, form, data) {
		if (!data) {
			return null;
		}
		const nameRules = [
			{
				required: false,
				message: i18n.t('validation.enter-arg', { arg: i18n.t('common.name') }),
			},
		];
		const widthRules = [
			{
				required: true,
				message: i18n.t('validation.enter-arg', {
					arg: i18n.t('common.width'),
				}),
			},
		];
		const heightRules = [
			{
				required: true,
				message: i18n.t('validation.enter-arg', {
					arg: i18n.t('common.height'),
				}),
			},
		];
		return (
			<React.Fragment>
				<Form.Item name='name' label={i18n.t('common.name')} rules={nameRules} colon={false}>
					<Input />
				</Form.Item>
				<React.Fragment>
					<Row>
						<Col span={12}>
							<Form.Item name='width' label={i18n.t('common.width')} rules={widthRules} colon={false}>
								<InputNumber />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='height' label={i18n.t('common.height')} rules={heightRules} colon={false}>
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
				</React.Fragment>
			</React.Fragment>
		);
	},
};
