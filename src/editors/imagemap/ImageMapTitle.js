import React, { Component } from 'react';
import { Flex } from '../../components/flex';

class ImageMapTitle extends Component {
	render() {
		const { content, action, children } = this.props;
		return (
			children || (
				<Flex className="rde-content-layout-title" alignItems="center" flexWrap="wrap">
					<Flex.Item flex="0 1 auto">
						<Flex
						    style={{ marginLeft: 8}}
							className="rde-content-layout-title-title"
							justifyContent="flex-start"
							alignItems="center"
						>
							<img src='./favicon-32x32.png' />
							&nbsp;VanRoll
						</Flex>
					</Flex.Item>
					<Flex.Item flex="auto">
						<Flex className="rde-content-layout-title-content" alignItems="center">
							{content}
						</Flex>
					</Flex.Item>
					<Flex.Item flex="auto">
						<Flex className="rde-content-layout-title-action" justifyContent="flex-end" alignItems="center">
							{action}
						</Flex>
					</Flex.Item>
				</Flex>
			)
		);
	}
}

export default ImageMapTitle;
