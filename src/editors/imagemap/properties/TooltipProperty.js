import React from 'react';
import { Form, Switch } from 'antd';
import i18n from 'i18next';

export default {
	render(canvasRef, form, data) {
		if (!data) {
			return null;
		}
		return (
			<Form.Item name='tooltip.enabled'
				label={i18n.t('imagemap.tooltip.tooltip-enabled')}
				rules={[{ type: 'boolean' }]}
				colon={false}>
				<Switch size="small" />
			</Form.Item>
		);
	},
};
