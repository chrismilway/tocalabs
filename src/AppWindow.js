import React, { Component } from 'react';
import debounce from 'debounce';
import AppNode from './AppNode';
import AppConnection from './AppConnection';
import NodeContext from './context';

export default class AppWindow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			size: [0, 0],
			offset: [0, 0],
		};

		this.window = React.createRef();
	}

	componentDidMount() {
		setTimeout(() => { this.resize(); }, 50); // I feel dirty but the day is 14 hours old
		window.addEventListener('resize', debounce(this.resize.bind(this), 250));
	}

	resize() {
		const { width, height, top, left } = this.window.current.getBoundingClientRect();
		const size = [width, height];
		const offset = [left, top];
		this.setState({ size, offset });
	}

	render() {
		const { selectedNode, onGrab, onConnect } = this.props;
		const { size: [width, height], offset } = this.state;
		const viewBox = `0 0 ${width} ${height}`;
		return (
			<div className="app-window" ref={this.window}>
				<svg width={width} height={height} viewBox={viewBox}>
					<NodeContext.Consumer>
						{(nodeArr) => {
							const nodes = nodeArr.map(n =>
								<AppNode
									key={n.id}
									node={n}
									onGrab={onGrab}
									offset={offset}
									selectedNode={selectedNode}
									onConnect={onConnect}
								/>);
							const connections = nodeArr
								.reduce((arr, node, idx, nodes) => {
									console.log(node.position);
									return [
										...arr,
										...node.connections
											.filter(c => c.to)
											.map(c => ({
												start: node.position,
												end: nodes.find(n => n.id === c.to).position,
											})),
									];
								}, [])
								.map((c, idx) => <AppConnection key={idx} connection={c} />);
							return (
								<React.Fragment>
									{connections}
									{nodes}
								</React.Fragment>
							)
						}}
					</NodeContext.Consumer>
				</svg>
			</div>
		);
	}
}