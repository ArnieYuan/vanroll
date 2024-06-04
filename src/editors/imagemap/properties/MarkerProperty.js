import React from 'react';
import { Form } from 'antd';

import IconChooser from '../../../components/icon/IconChooser';

export default {
	render(canvasRef, form, data) {
		return (
			<React.Fragment>
				<Form.Item name='icon'>
					<IconChooser icon={data.icon} />
				</Form.Item>
			</React.Fragment>
		);
	},
};
