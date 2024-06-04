import React from 'react';
import { Form, Slider, Switch } from 'antd';
import i18n from 'i18next';
import { shadowBlurRules, shadowOffsetRules } from './FormRules';

import ColorPicker from '../../../components/common/ColorPicker';

export default {
	render(canvasRef, form, data) {
		const enabeld = data.shadow ? data.shadow.enabled || false : false;
		return (
			<React.Fragment>
				<Form.Item name='shadow.enabled' label={i18n.t('imagemap.shadow.shadow-enabled')} colon={false}>
					<Switch size="small" />
				</Form.Item>
				{enabeld ? (
					<React.Fragment>
						<Form.Item name='shadow.color' label={i18n.t('common.color')} colon={false}>
							<ColorPicker />
						</Form.Item>
						<Form.Item name='shadow.blur' label={i18n.t('common.blur')} rules={shadowBlurRules} colon={false}>
							<Slider min={0} max={100} />
						</Form.Item>
						<Form.Item name='shadow.offsetX' label={i18n.t('imagemap.shadow.offset-x')} rules={shadowOffsetRules} colon={false}>
							<Slider min={0} max={100} />
						</Form.Item>
						<Form.Item name='shadow.offsetY' label={i18n.t('imagemap.shadow.offset-y')} rules={shadowOffsetRules} colon={false}>
							<Slider min={0} max={100} />
						</Form.Item>
					</React.Fragment>
				) : null}
			</React.Fragment>
		);
	},
};
