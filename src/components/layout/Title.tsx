import { Button, Menu, Modal, Tooltip } from 'antd';
import i18next from 'i18next';
import React, { useState } from 'react';
import { Flex } from '../flex';
import { ShortcutHelp } from '../help';
import Icon from '../icon/Icon';
import { Link, useLocation } from 'react-router-dom';

const Title = () => {
	const [visible, setVisible] = useState(false);
	const location = useLocation();

	const handlers = {
		goDocs: () => {
			window.open('./docs');
		},
		showHelp: () => {
			setVisible(true);
		},
		hideHelp: () => { setVisible(false); },
	};

	return (
		<Flex
			style={{ background: 'linear-gradient(141deg,#23303e,#404040 51%,#23303e 75%)' }}
			flexWrap="wrap"
			flex="1"
			alignItems="center"
		>
			<Flex style={{ marginLeft: 8 }} flex="0 1 auto">
				<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>VanRoll</span>
				<Tooltip title={i18next.t('action.go-docs')} overlayStyle={{ fontSize: 16 }}>
					<Button
						className="rde-action-btn"
						style={{
							color: 'white',
						}}
						shape="circle"
						size="large"
						onClick={handlers.goDocs}
					>
						<Icon name="book" prefix="fas" size={1.5} />
					</Button>
				</Tooltip>
				<Tooltip title={i18next.t('action.shortcut-help')} overlayStyle={{ fontSize: 16 }}>
					<Button
						className="rde-action-btn"
						style={{
							color: 'white',
						}}
						shape="circle"
						size="large"
						onClick={handlers.showHelp}
					>
						<Icon name="question" prefix="fas" size={1.5} />
					</Button>
				</Tooltip>
			</Flex>
			<Flex style={{ marginLeft: 88 }}>
				<Menu
					mode="horizontal"
					theme="dark"
					style={{ background: 'transparent', fontSize: '16px' }}
					selectedKeys={[location.pathname]}
				>
					<Menu.Item key="/edit" style={{ color: '#fff' }}>
						<Link to="/edit">{i18next.t('imagemap.imagemap')}</Link>
					</Menu.Item>
					<Menu.Item key="/adjust" style={{ color: '#fff' }}>
						<Link to="/adjust">{i18next.t('fiber.fiber')}</Link>
					</Menu.Item>
				</Menu>
			</Flex>
			<Modal
				visible={visible}
				onCancel={handlers.hideHelp}
				closable={true}
				footer={null}
				width="50%"
			>
				<ShortcutHelp />
			</Modal>
		</Flex>
	);
}

export default Title;
