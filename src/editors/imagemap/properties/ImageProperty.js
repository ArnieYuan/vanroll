import { Form, Radio } from 'antd';
import i18n from 'i18next';
import React from 'react';

import FileUpload from '../../../components/common/FileUpload';
import UrlModal from '../../../components/common/UrlModal';

export default {
	render(canvasRef, form, data) {
		if (!data) {
			return null;
		}
		const fileRules = [
			{
				required: true,
				message: i18n.t('validation.enter-property', { arg: i18n.t('common.file') }),
			},
		];
		return (
			<React.Fragment>
				<Form.Item name='imageLoadType' label={i18n.t('imagemap.image.image-load-type')} colon={false}>
					<Radio.Group size="small">
						<Radio.Button value="file">{i18n.t('imagemap.image.file-upload')}</Radio.Button>
						<Radio.Button value="src">{i18n.t('imagemap.image.image-url')}</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{form.getFieldValue('imageLoadType') === 'file' ? (
					<Form.Item name='file' label={i18n.t('common.file')} rules={fileRules} colon={false}>
						<FileUpload accept="image/*" limit={100} />
					</Form.Item>
				) : (
					<Form.Item name='src'>
						<UrlModal value={form.getFieldValue('imageLoadType') === 'src'} />
					</Form.Item>
				)}
			</React.Fragment>
		);
	},
};
