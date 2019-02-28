import React, { Component } from 'react';
import './node.css';

export default class AppNode extends Component {

	grab({ clientX, clientY }) {
		const { onGrab, node: { id }, offset: [x, y]} = this.props;
		const { left, top } = this.elem.getBoundingClientRect();
		const offset = [
			x + (clientX - left),
			y + (clientY - top),
		];
		onGrab(id, offset);
	}

	connect(label) {
		const { node: { id }, onConnect } = this.props;
		const to = +window.prompt('Choose an id');
		onConnect(id, label, to);
	}

	render() {
		const { node, selectedNode } = this.props;
		const { id, type, label, position, connections } = node;
		const classes = ['node', `node--${type}`];
		if (selectedNode === id) {
			classes.push('node--selected');
		};
		return (
			<g 
				ref={(elem) => { this.elem = elem; }}
				transform={`translate(${position.join(' ')})`}
				onMouseDown={this.grab.bind(this)}	
			>
				<rect width="100" height="40" x="0" y="0"
					fill="none"
					className={classes.join(' ')}
				/>

				<text x="10" y="20">{label}</text>

				{
					connections
						.filter(({ to }) => !to)
						.map((c, i) => (
							<rect 
								key={c.label}
								x={(i * 25) + 5}
								y="30"
								width="20"
								height="20"
								onClick={() => { this.connect(c.label); }}
							/>
						))
				}
			</g>
		);
	}
}