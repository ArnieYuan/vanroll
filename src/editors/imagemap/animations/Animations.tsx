import React, { useState } from 'react';
import { Button } from 'antd';
import type { AnimeParams } from 'animejs';

import { Flex } from '../../../components/flex';
import AnimationList from './AnimationList';
import AnimationModal from './AnimationModal';
import Icon from '../../../components/icon/Icon';
import Scrollbar from '../../../components/common/Scrollbar';

const Animations = (animations: AnimeParams[], onChangeAnimations) => {
	const [animation, setAnimation] = useState(null);
	const [visible, setVisible] = useState(false);
	const [index, setIndex] = useState(0);
	const [current, setCurrent] = useState<'add' | 'modify'>('add');

	const handlers = {
		onOk: (animation) => {
			if (!animation) {
				return;
			}
			if (current === 'add') {
				animations.push(animation);
			} else {
				animations.splice(index, 1, animation);
			}
			setVisible(false);
			setAnimation(null);
			onChangeAnimations(animations);
		},
		onCancel: () => {
			setVisible(false);
		},
		onAdd: () => {
			setVisible(true);
			setCurrent('add');
		},
		onEdit: (animation, index) => {
			setVisible(true);
			setAnimation(animation);
			setCurrent('modify');
			setIndex(index);
		},
		onDelete: index => {
			animations.splice(index, 1);
			onChangeAnimations(animations);
		},
		onClear: () => {
			onChangeAnimations([]);
		}
	};

	return (
		<Scrollbar>
				<Flex flexDirection="column">
					<Flex justifyContent="flex-end" style={{ padding: 8 }}>
						<Button className="rde-action-btn" shape="circle" onClick={handlers.onAdd}>
							<Icon name="plus" />
						</Button>
						<Button className="rde-action-btn" shape="circle" onClick={handlers.onClear}>
							<Icon name="times" />
						</Button>
						<AnimationModal
							visible={visible}
							animation={animation}
							onOk={handlers.onOk}
							onCancel={handlers.onCancel}
						/>
					</Flex>
					<AnimationList animations={animations} onEdit={handlers.onEdit} onDelete={handlers.onDelete} />
				</Flex>
		</Scrollbar>
	);
};

export default Animations;
