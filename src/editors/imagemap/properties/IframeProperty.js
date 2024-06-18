import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import FileOrUrlModal from '../../../components/common/FileOrUrlModal';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<Form.Item>
				{getFieldDecorator('src', {
					rules: [
						{
							required: true,
							message: 'Please select image',
						},
					],
					initialValue: data.src,
				})(<FileOrUrlModal form={form} />)}
			</Form.Item>
		);
	},
};
