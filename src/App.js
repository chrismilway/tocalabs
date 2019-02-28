import React, { Component } from 'react';
import NodeContext from './context';
import AppList from './AppList';
import AppControls from './AppControls';
import AppWindow from './AppWindow';
import { getId } from './utils';

const LSKEY = 'toca-test-nodes';

class App extends Component {
    constructor() {
        super();

        this.state = {
            nodes: [],
            selectedNode: null,
            activeNode: null,
            offset: null,
        };

        this.grab = this.grab.bind(this);
        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.connect = this.connect.bind(this);
    }

    componentDidMount() {
        const rawNodes = localStorage.getItem(LSKEY);
        if (rawNodes) {
            const nodes = JSON.parse(rawNodes);
            this.setState({ nodes });
        }
    }

    componentDidUpdate(oldProps, oldState) {
        const { nodes: oldNodes } = oldState;
        const { nodes } = this.state;
        if (nodes !== oldNodes) {
            localStorage.setItem(LSKEY, JSON.stringify(nodes));
        }
    }

    selectNode(selectedNode) {
        this.setState({ selectedNode });
    }

    createNode(type) {
        const { nodes: oldNodes } = this.state;
        const nodes = oldNodes.slice(0);
        const id = getId(nodes);
        const newNode = { id, type, label: `Untitled-${id}`, position: [5,5], connections: [] };
        switch (type) {
            case 'activity':
                newNode.connections.push({ to: null, label: 'to' });
                break;
            case 'decision':
                newNode.connections.push({ to: null, label: 'Yes' });
                newNode.connections.push({ to: null, label: 'No' });
                break;
            default:
        }
        nodes.push(newNode);
        this.setState({ nodes });
    }

    grab(activeNode, offset) {
        this.setState({ activeNode, offset });

        window.addEventListener('mousemove', this.drag);
        window.addEventListener('mouseup', this.drop);
    }

    drag(e) {
        const { offset, activeNode } = this.state;
        const { clientX: x, clientY: y } = e;
        const position = [x, y].map((p, i) => p - offset[i]);

        // This is _terribly_ inefficient, but I've been working for 13.5 hours
        // so it's probably working more efficiently than I am...
        const { nodes: oldNodes } = this.state;
        const nodes = oldNodes.slice(0);
        const node = nodes.find(n => n.id === activeNode);
        node.position = position;
        this.setState({ nodes });
    }

    drop() {
        this.setState({ activeNode: null, offset: null });
        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('mouseup', this.drop);
    }

    connect(id, label, to) {
        const { nodes: oldNodes } = this.state;
        const nodes = oldNodes.slice(0);
        const node = nodes.find(n => n.id === id);
        const connection = node.connections.find(c => c.label === label);
        connection.to = to;
        this.setState({ nodes });
    }

    render() {
        const { nodes, selectedNode } = this.state;

        return (
            <div className="app">
                <AppControls onAdd={(type) => { this.createNode(type) }}/>
                <NodeContext.Provider value={nodes}>
                    <AppWindow
                        selectedNode={selectedNode}
                        onGrab={this.grab}
                        onConnect={this.connect}
                    />
                    <AppList onSelect={(id) => { this.selectNode(id) }}/>
                </NodeContext.Provider>
            </div>
        );
    }
}

export default App;
