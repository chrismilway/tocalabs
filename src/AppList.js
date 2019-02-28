import React from 'react';
import NodeContext from './context';
import AppListItem from './AppListItem';

export default function AppList({ onSelect }) {
	return (
		<div className="app-list">
			<NodeContext.Consumer>
				{(nodeArr) => {
					const nodes = nodeArr.map(n => (
						<AppListItem
							node={n}
							key={n.id}
							onSelect={onSelect}
						/>));
					return nodes;
				}}
			</NodeContext.Consumer>
		</div>
	)
}