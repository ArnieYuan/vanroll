import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import ChartModal from '../../../components/common/ChartModal';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<Form.Item>
				{getFieldDecorator('chartOption', {
					rules: [
						{
							required: true,
							message: 'Please input code',
						},
					],
					initialValue: data.chartOptionStr,
				})(<ChartModal form={form} />)}
			</Form.Item>
		);
	},
};
