import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import IconChooser from '../../../components/icon/IconChooser';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		return (
			<React.Fragment>
				<Form.Item>
					{getFieldDecorator('icon', {
						initialValue: data.icon,
					})(<IconChooser icon={data.icon} />)}
				</Form.Item>
			</React.Fragment>
		);
	},
};
