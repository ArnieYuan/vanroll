import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout, Modal } from 'antd';
import i18next from 'i18next';
import logo from '../../../public/favicon-32x32.png'
import { ShortcutHelp } from '../../components/help';

const ImageMapTitle = (props) => {
	const { dispatch } = props;
	const [visible, setVisible] = useState(false);
	const navigate = useNavigate();
	const items = [
		{
			label: 'File', key: 'fileSubmenu',
			children: [
				{ label: i18next.t('action.upload'), key: 'upload' },
				{ label: i18next.t('action.download'), key: 'download' },
				{ label: i18next.t('action.image-save'), key: 'image-save' },
				{ label: i18next.t('action.exit'), key: 'exit' }
			]
		},
		{ label: i18next.t('action.present'), key: 'present' },
		{
			label: 'Help', key: 'helpSubmenu',
			children: [
				{ label: i18next.t('action.help'), key: 'help' },
				{ label: i18next.t('action.go-docs'), key: 'docs' }
			],
		},
	];
	const handlers = {
		goDocs: () => {
			window.open('./docs');
		},
		showHelp: () => {
			setVisible(true);
		},
		hideHelp: () => { setVisible(false); },
	};
	const onClick = (e) => {
		switch (e.key) {
			case 'docs':
				handlers.goDocs();
				return;
			case 'help':
				handlers.showHelp();
				return;
			case 'exit':
				navigate('/');
				return;
			case 'present':
				navigate('/present');
				return;
			default:
				dispatch({ type: e.key });
		}
	};
	return (
		<Layout.Header style={{ paddingLeft: '10px', display: 'flex', height: '45px', alignItems: 'center' }}>
			<img src={logo} alt="VanRoll" />
			<Menu
				theme="dark"
				mode="horizontal"
				onClick={onClick}
				items={items}
				style={{ flex: 'auto' }}
			/>
			<Modal
				open={visible}
				onCancel={handlers.hideHelp}
				closable={true}
				footer={null}
				width="50%"
			>
				<ShortcutHelp />
			</Modal>
		</Layout.Header>
	);
}

export default ImageMapTitle;
