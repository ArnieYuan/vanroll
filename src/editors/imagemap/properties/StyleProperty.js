import React from 'react';
import { Form, Slider, Select, InputNumber, Col, Row } from 'antd';
import i18n from 'i18next';

import ColorPicker from '../../../components/common/ColorPicker';

export default {
	render(canvasRef, form, data) {
		return (
			<React.Fragment>
				<Form.Item name='fill' label={i18n.t('imagemap.style.fill-color')} colon={false}>
					<ColorPicker />
				</Form.Item>
				<Form.Item name='opacity' label={i18n.t('common.opacity')} colon={false}
					rules={[
						{
							type: 'number',
							min: 0,
							max: 1,
						},
					]}>
					<Slider min={0} max={1} step={0.1} />
				</Form.Item>
				<Form.Item name='stroke' label={i18n.t('imagemap.style.stroke-color')} colon={false}>
					<ColorPicker />
				</Form.Item>
				<Form.Item name='strokeWidth' label={i18n.t('imagemap.style.stroke-width')} colon={false}>
					<Select showSearch style={{ width: '100%' }}>
						{Array.from({ length: 12 }, (v, k) => {
							const value = k + 1;
							return (
								<Select.Option key={value} value={value}>
									{value}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				{data.type === 'rect' ? (
					<Row gutter={8}>
						<Col md={24} lg={12}>
							<Form.Item name='rx' label={i18n.t('imagemap.style.rx')} colon={false}>
								<InputNumber min={0} />
							</Form.Item>
						</Col>
						<Col md={24} lg={12}>
							<Form.Item name='ry' label={i18n.t('imagemap.style.ry')} colon={false}>
								<InputNumber min={0} />
							</Form.Item>
						</Col>
					</Row>
				) : null}
			</React.Fragment>
		);
	},
};
