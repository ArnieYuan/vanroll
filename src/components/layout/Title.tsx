import { Button, Menu, Tooltip } from 'antd';
import i18next from 'i18next';
import React from 'react';
import { Flex } from '../flex';
import Icon from '../icon/Icon';
import { useNavigate, useLocation } from 'react-router-dom';

const Title = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handlers = {
		goDocs: () => {
			window.open('./docs');
		},
		onClick: (e) => {
			navigate(e.key);
		}
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
					>
						<Icon name="question" prefix="fas" size={1.5} />
					</Button>
				</Tooltip>
			</Flex>
			<Flex style={{ marginLeft: 88 }}>
				<Menu
					mode="horizontal"
					theme="dark"
					style={{ background: 'transparent', fontSize: '16px', flex: 'auto' }}
					selectedKeys={[location.pathname]}
					onClick={handlers.onClick}
					items={[
						{ label: i18next.t('action.edit'), key: '/edit' },
						{ label: i18next.t('action.present'), key: '/present' }
					]}
				/>
			</Flex>
		</Flex>
	);
}

export default Title;
