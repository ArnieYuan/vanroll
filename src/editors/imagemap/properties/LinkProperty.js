import React from 'react';
import { Form, Select, Switch, Input } from 'antd';
import i18n from 'i18next';

export default {
	render(canvasRef, form, data) {
		const linkRules = [
			{
				required: true,
				message: i18n.t('validation.enter-property', {
					arg: i18n.t('imagemap.marker.link-enabled'),
				}),
			},
		];
		const linkUrlRules = [
			{
				required: true,
				message: i18n.t('validation.enter-property', { arg: i18n.t('common.url') }),
			},
		];
		return (
			<React.Fragment>
				<Form.Item name='link.enabled' label={i18n.t('imagemap.link.link-enabled')} rules={linkRules} colon={false}>
					<Switch size="small" />
				</Form.Item>
				{form.getFieldValue('link.enabled') ? (
					<React.Fragment>
						<Form.Item name='link.state' label={i18n.t('common.state')} colon={false}>
							<Select>
								<Select.Option value="current">{i18n.t('common.current')}</Select.Option>
								<Select.Option value="new">{i18n.t('common.new')}</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name='link.url' label={i18n.t('common.url')} rules={linkUrlRules} colon={false}>
							<Input />
						</Form.Item>
					</React.Fragment>
				) : null}
			</React.Fragment>
		);
	},
};
